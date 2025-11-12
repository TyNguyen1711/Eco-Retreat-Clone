// "use client";
// import { useEffect, useRef } from "react";

// export default function PanoramaViewer() {
//   const imgRef = useRef<HTMLImageElement>(null);
//   const totalFrames = 120;
//   const path = "/images/rotation/";

//   useEffect(() => {
//     const img = imgRef.current;
//     if (!img) return;

//     img.draggable = false;
//     img.addEventListener("dragstart", (e) => e.preventDefault());

//     for (let i = 1; i <= totalFrames; i++) {
//       const preload = new Image();
//       preload.src = `${path}${i}.jpg`;
//     }

//     let currentFrame = 1;
//     let isDragging = false;
//     let lastX = 0;
//     let velocity = 0;
//     let animationFrame: number;

//     const showFrame = (frame: number) => {
//       frame = Math.round(frame);
//       currentFrame = ((frame - 1 + totalFrames) % totalFrames) + 1;
//       img.src = `${path}${currentFrame}.jpg`;
//     };

//     const animateInertia = () => {
//       if (Math.abs(velocity) < 0.05) {
//         velocity = 0;
//         return;
//       }
//       showFrame(currentFrame + velocity);
//       velocity *= 0.95;
//       animationFrame = requestAnimationFrame(animateInertia);
//     };

//     const onPointerDown = (e: PointerEvent) => {
//       e.preventDefault();
//       isDragging = true;
//       lastX = e.clientX;
//       velocity = 0;
//       cancelAnimationFrame(animationFrame);
//       img.setPointerCapture(e.pointerId);
//       img.style.cursor = "grabbing";
//     };

//     const onPointerMove = (e: PointerEvent) => {
//       if (!isDragging) return;
//       const delta = e.clientX - lastX;
//       lastX = e.clientX;
//       const sensitivity = 0.2;
//       showFrame(currentFrame + delta * sensitivity);
//       velocity = delta * sensitivity;
//     };

//     const immediateStopOnRelease = true;

//     const endPointer = (e: PointerEvent) => {
//       if (!isDragging) return;
//       isDragging = false;
//       try {
//         img.releasePointerCapture(e.pointerId);
//       } catch {}
//       img.style.cursor = "grab";
//       cancelAnimationFrame(animationFrame);
//       if (immediateStopOnRelease) {
//         velocity = 0;
//         return;
//       }
//       const maxVelocity = 10;
//       if (Math.abs(velocity) > maxVelocity)
//         velocity = Math.sign(velocity) * maxVelocity;
//       if (Math.abs(velocity) > 0.1)
//         animationFrame = requestAnimationFrame(animateInertia);
//       else velocity = 0;
//     };

//     img.addEventListener("pointerdown", onPointerDown);
//     img.addEventListener("pointermove", onPointerMove);
//     img.addEventListener("pointerup", endPointer);
//     img.addEventListener("pointercancel", endPointer);
//     window.addEventListener("pointerup", endPointer);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       img.removeEventListener("pointerdown", onPointerDown);
//       img.removeEventListener("pointermove", onPointerMove);
//       img.removeEventListener("pointerup", endPointer);
//       img.removeEventListener("pointercancel", endPointer);
//       window.removeEventListener("pointerup", endPointer);
//     };
//   }, []);

//   return (
//     <div className="w-full h-screen overflow-hidden flex justify-center items-start">
//       <img
//         ref={imgRef}
//         src="/images/rotation/1.jpg"
//         alt="Panorama"
//         className="w-full h-full object-cover object-center select-none cursor-grab"
//       />
//     </div>
//   );
// }
"use client";
import { useEffect, useRef, useState } from "react";

export default function PanoramaViewer() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const totalFrames = 120;
  const path = "/images/rotation/";
  const imagesCache = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Preload tất cả ảnh VÀ ĐỢI chúng load xong
    const preloadImages = async () => {
      const promises = [];

      for (let i = 1; i <= totalFrames; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const preload = new Image();
          preload.onload = () => {
            setLoadProgress(Math.round((i / totalFrames) * 100));
            resolve(preload);
          };
          preload.onerror = reject;
          preload.src = `${path}${i}.jpg`;
        });
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

    img.draggable = false;
    img.addEventListener("dragstart", (e) => e.preventDefault());

    let currentFrame = 1;
    let isDragging = false;
    let lastX = 0;
    let velocity = 0;
    let animationFrame: number;

    const showFrame = (frame: number) => {
      if (isLoading) return; // Không show frame khi đang load

      frame = Math.round(frame);
      currentFrame = ((frame - 1 + totalFrames) % totalFrames) + 1;

      // Dùng ảnh đã cache thay vì set src mới
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
      if (isLoading) return;
      e.preventDefault();
      isDragging = true;
      lastX = e.clientX;
      velocity = 0;
      cancelAnimationFrame(animationFrame);
      img.setPointerCapture(e.pointerId);
      img.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || isLoading) return;
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
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-10">
          <div className="text-white text-2xl mb-4">Loading Panorama...</div>
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="text-white mt-2">{loadProgress}%</div>
        </div>
      )}
      <img
        ref={imgRef}
        src="/images/rotation/1.jpg"
        alt="Panorama"
        className={`w-full h-full object-cover object-center select-none ${
          isLoading ? "cursor-wait opacity-50" : "cursor-grab"
        }`}
      />
    </div>
  );
}
