"use client";
import handIcon from "../assets/icons/handd_icon.png";
import mouseIcon from "../assets/icons/mouse_icon.png";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
const UserGuide = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="w-[90%] md:w-[520px] h-[300px] md:h-[400px] xl:w-[580px] xl:h-[450px] p-5 md:p-8 xl:p-10 
                flex flex-col justify-center items-center gap-6 md:gap-8 bg-secondary/0 backdrop-blur-xs border-[#4ade80] border-2 rounded-3xl drop-shadow-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <h1 className="text-2xl md:text-2xl xl:text-3xl font-bold text-primary text-center uppercase">
        Hướng dẫn thao tác
      </h1>
      <div className="flex w-full justify-center items-center gap-5">
        <div className="flex flex-col items-center gap-3 relative">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={handIcon}
              alt="Drag icon"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          </div>
        </div>

        <span className="text-white text-base md:text-lg font-medium">
          hoặc
        </span>

        <div className="flex flex-col items-center gap-2">
          <Image
            src={mouseIcon}
            alt="Drag icon"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        </div>
      </div>

      <p className="text-white text-sm md:text-xl px-6 md:px-16 text-center">
        Kéo sang trái hoặc phải để trải nghiệm toàn cảnh dự án
      </p>

      <PrimaryButton handleClick={() => setIsOpen(false)} title="ĐÃ HIỂU" />
    </div>
  );
};
export default UserGuide;
