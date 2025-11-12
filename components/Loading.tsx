import Image from "next/image";
import Logo1 from "../assets/logo/logo1.png";

const Loading = () => {
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
    </>
  );
};
export default Loading;
