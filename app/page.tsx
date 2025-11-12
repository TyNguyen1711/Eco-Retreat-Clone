import Image from "next/image";
import bgLoading from "../assets/images/bgLoading.jpg";
import Loading from "@/components/Loading";
export default function LoadingPage() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center gap-5 md:gap-10">
      <div className="absolute object-cover h-full w-full z-0">
        <Image
          alt="bgImage"
          src={bgLoading}
          fill
          className="object-cover"
          priority
        />
        <div className="bg-[radial-gradient(circle,_rgba(96,161,21,0.5)_0%,_rgba(6,24,0,0.5)_0%)] w-full h-full absolute backdrop-blur-sm" />
      </div>
      <Loading />
    </section>
  );
}
