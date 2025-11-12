"use client";
import { useEffect, useRef } from "react";

export default function PanoramaViewer() {
  const imgRef = useRef<HTMLImageElement>(null);
  const totalFrames = 120;
  const path = "/images/rotation/";

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    img.draggable = false;
    img.addEventListener("dragstart", (e) => e.preventDefault());

    for (let i = 1; i <= totalFrames; i++) {
      const preload = new Image();
      preload.src = `${path}${i}.jpg`;
    }

    let currentFrame = 1;
    let isDragging = false;
    let lastX = 0;
    let velocity = 0;
    let animationFrame: number;

    const showFrame = (frame: number) => {
      frame = Math.round(frame);
      currentFrame = ((frame - 1 + totalFrames) % totalFrames) + 1;
      img.src = `${path}${currentFrame}.jpg`;
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
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-start">
      <img
        ref={imgRef}
        src="/images/rotation/1.jpg"
        alt="Panorama"
        className="w-full h-full object-cover object-center select-none cursor-grab"
      />
    </div>
  );
}
