"use client";
import Image from "next/image";
import Logo1 from "../assets/logo/logo1.png";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Loading() {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    router.push("/overview");
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      router.push("/overview");
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [router]);

  return (
    <>
      <div className="relative w-auto h-auto flex justify-center items-center flex-col">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="z-10 animate-spin-slow w-80 h-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[400px] md:h-[400px]"
          >
            <circle
              stroke="url(#gradient)"
              r="190"
              cy="200"
              cx="200"
              strokeWidth="3"
              fill="transparent"
              className="path"
            />
            <linearGradient id="gradient">
              <stop stopOpacity="1" stopColor="#56FD6F" offset="50%" />
              <stop stopOpacity="0.5" stopColor="#ffffff" offset="100%" />
            </linearGradient>
          </svg>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-68 md:h-68">
            <Image
              src={Logo1}
              alt="Eco Retreat Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-max px-16 md:px-20 p-3 md:py-5 cursor-pointer z-10 bg-[#5fcd6f] rounded-2xl border-[#017111] border-2 hover:bg-white hover:border-white drop-shadow-lg drop-shadow-white/0 hover:drop-shadow-white transition-all duration-300 overflow-hidden group"
      >
        <span className="text-white group-hover:text-primary font-medium text-sm md:text-base uppercase w-full">
          BẮT ĐẦU
        </span>
      </button>
    </>
  );
}
