"use client";
import { useEffect, useRef, useState } from "react";
import bgLoading from "../assets/images/bgLoading.jpg";
import { default as NextImage } from "next/image";
import DataLoading from "./DataLoading";
import firstFrame from "../assets/images/rotation/1.jpg";
const PanoramaViewer = () => {
  // const imgRef = useRef<HTMLImageElement>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadProgress, setLoadProgress] = useState(0);
  // const totalFrames = 120;
  // const path = "/images/rotation/";
  // const imagesCache = useRef<HTMLImageElement[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const totalFrames = 120;
  const imagesCache = useRef<HTMLImageElement[]>([]);
  // useEffect(() => {
  //   const preloadImages = async () => {
  //     const promises = [];
  //     let loadedCount = 0;

  //     for (let i = 1; i <= totalFrames; i++) {
  //       const promise = new Promise<HTMLImageElement>((resolve, reject) => {
  //         const preload = new Image();
  //         preload.onload = () => {
  //           loadedCount++;
  //           setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
  //           resolve(preload);
  //         };
  //         preload.onerror = reject;
  //         preload.src = `${path}${i}.jpg`;
  //       });
  //       promises.push(promise);
  //     }

  //     try {
  //       imagesCache.current = await Promise.all(promises);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Failed to preload images:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   preloadImages();
  // }, []);
  useEffect(() => {
    const preloadImages = async () => {
      const promises = [];
      let loadedCount = 0;

      for (let i = 1; i <= totalFrames; i++) {
        const promise = (async () => {
          // Dynamic import từ assets
          const imgModule = await import(`../assets/images/rotation/${i}.jpg`);

          return new Promise<HTMLImageElement>((resolve, reject) => {
            const preload = new Image();
            preload.onload = () => {
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
              resolve(preload);
            };
            preload.onerror = reject;
            preload.src = imgModule.default.src;
          });
        })();

        promises.push(promise);
      }

      try {
        imagesCache.current = await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to preload images:", error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);
  useEffect(() => {
    const img = imgRef.current;
    if (!img || isLoading) return;

    img.draggable = false;
    img.addEventListener("dragstart", (e) => e.preventDefault());

    let currentFrame = 1;
    let isDragging = false;
    let lastX = 0;
    let velocity = 0;
    let animationFrame: number;

    const showFrame = (frame: number) => {
      frame = Math.round(frame);
      currentFrame = ((frame - 1 + totalFrames) % totalFrames) + 1;

      const cachedImage = imagesCache.current[currentFrame - 1];
      if (cachedImage && img) {
        img.src = cachedImage.src;
      }
    };

    const animateInertia = () => {
      if (Math.abs(velocity) < 0.05) {
        velocity = 0;
        return;
      }
      showFrame(currentFrame + velocity);
      velocity *= 0.95;
      animationFrame = requestAnimationFrame(animateInertia);
    };

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      isDragging = true;
      lastX = e.clientX;
      velocity = 0;
      cancelAnimationFrame(animationFrame);
      img.setPointerCapture(e.pointerId);
      img.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - lastX;
      lastX = e.clientX;
      const sensitivity = 0.2;
      showFrame(currentFrame + delta * sensitivity);
      velocity = delta * sensitivity;
    };

    const immediateStopOnRelease = true;

    const endPointer = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        img.releasePointerCapture(e.pointerId);
      } catch {}
      img.style.cursor = "grab";
      cancelAnimationFrame(animationFrame);
      if (immediateStopOnRelease) {
        velocity = 0;
        return;
      }
      const maxVelocity = 10;
      if (Math.abs(velocity) > maxVelocity)
        velocity = Math.sign(velocity) * maxVelocity;
      if (Math.abs(velocity) > 0.1)
        animationFrame = requestAnimationFrame(animateInertia);
      else velocity = 0;
    };

    img.addEventListener("pointerdown", onPointerDown);
    img.addEventListener("pointermove", onPointerMove);
    img.addEventListener("pointerup", endPointer);
    img.addEventListener("pointercancel", endPointer);
    window.addEventListener("pointerup", endPointer);

    return () => {
      cancelAnimationFrame(animationFrame);
      img.removeEventListener("pointerdown", onPointerDown);
      img.removeEventListener("pointermove", onPointerMove);
      img.removeEventListener("pointerup", endPointer);
      img.removeEventListener("pointercancel", endPointer);
      window.removeEventListener("pointerup", endPointer);
    };
  }, [isLoading]);

  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center relative">
      {isLoading ? (
        <section className="relative h-screen w-full flex flex-col justify-center items-center gap-5 md:gap-10">
          <div className="absolute object-cover h-full w-full z-0">
            <NextImage
              alt="bgImage"
              src={bgLoading}
              fill
              className="object-cover"
              priority
            />
            <div className="bg-[radial-gradient(circle,rgba(96,161,21,0.5)_0%,rgba(6,24,0,0.5)_0%)] w-full h-full absolute backdrop-blur-sm" />
          </div>
          <DataLoading progress={loadProgress} />
        </section>
      ) : (
        <img
          ref={imgRef}
          src={firstFrame.src}
          alt="Panorama"
          className="w-full h-full object-cover object-center select-none cursor-grab"
        />
      )}
    </div>
  );
};
export default PanoramaViewer;
