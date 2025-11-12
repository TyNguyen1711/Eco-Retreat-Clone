"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import PrimaryButton from "./PrimaryButton";
import Loading from "./Loading";

const IntroLoading = () => {
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
      <Loading />
      <PrimaryButton handleClick={handleStart} title="BẮT ĐẦU" />
    </>
  );
};
export default IntroLoading;
