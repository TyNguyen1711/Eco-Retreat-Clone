"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Logo from "../assets/logo/logo.png";
import arrow from "../assets/icons/arrow-down.png";
import {
  BookIcon,
  GlobeIcon,
  GridIcon,
  ImageIcon,
  LocationIcon,
  StarIcon,
} from "./Icon";
import { useRouter } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

const NavigationBar = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [activeTab, setActiveTab] = useState("toan-canh");
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const navItems: NavItem[] = [
    {
      id: "toan-canh",
      label: "TOÀN CẢNH",
      icon: <GlobeIcon />,
      href: "#overview",
    },
    {
      id: "vi-tri",
      label: "VỊ TRÍ",
      icon: <LocationIcon />,
      href: "#location",
    },
    {
      id: "phan-khu",
      label: "PHÂN KHU",
      icon: <GridIcon />,
      href: "#subdivision",
    },
    {
      id: "tien-ich",
      label: "TIỆN ÍCH",
      icon: <StarIcon />,
      href: "#utilities",
    },
    {
      id: "gallery",
      label: "GALLERY",
      icon: <ImageIcon />,
      href: "#gallery",
    },
    {
      id: "e-brochure",
      label: "E-BROCHURE",
      icon: <BookIcon />,
      href: "#ebrochure",
    },
  ];

  return (
    <nav className="fixed w-full max-w-[90%] md:h-14 bottom-0 left-1/2 -translate-x-1/2 z-10">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`absolute left-1/2 -translate-x-1/2 text-white shadow-lg md:h-6 px-10 md:px-18 bg-primary/85 hover:bg-primary
          w-16 h-4 flex items-center justify-center transition-all duration-300 bottom-0 cursor-pointer z-50 ${
            isVisible
              ? "rounded-b-xl md:rounded-b-2xl"
              : "rounded-t-xl md:rounded-t-2xl"
          }`}
      >
        <Image
          src={arrow}
          className={`transition-transform duration-300 z-100 ${
            isVisible ? "" : "rotate-180"
          }`}
          style={{ objectFit: "contain" }}
          alt="Eco Retreat Logo"
          fill
          priority
        />
      </button>

      <div
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(140%)",
          transition: "transform 300ms ease-in-out",
          pointerEvents: isVisible ? "auto" : "none",
        }}
        className={`bg-primary backdrop-blur-sm rounded-2xl shadow-lg  md:pl-3 -translate-y-4 md:-translate-y-6`}
      >
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center px-1 sm:px-2 hover:opacity-80 transition-opacity shrink-0 cursor-pointer"
          >
            <Image
              src={Logo}
              alt="LOGO"
              width={160}
              height={50}
              className="w-[70px] xs:w-[80px] sm:w-[100px] md:w-40 h-auto"
            />
          </button>

          <div className="flex flex-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.href);
                  setActiveTab(item.id);
                }}
                className={`
                  group
                  flex flex-1 items-center gap-1 md:gap-2 py-2 md:py-3 rounded-2xl text-sm font-semibold
                  transition-all duration-300 whitespace-nowrap justify-center
                    ${
                      activeTab === item.id
                        ? "bg-white text-primary drop-shadow-lg drop-shadow-white px-1 lg:px-0"
                        : "text-white hover:bg-white/50 hover:opacity-80"
                    }
                `}
              >
                <span
                  className={`flex items-center justify-center transition-all ${
                    activeTab === item.id
                      ? "text-primary"
                      : "text-white group-hover:text-primary"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-[8px] md:text-xs text-center uppercase font-semibold transition-all duration-300 overflow-hidden ${
                    activeTab === item.id
                      ? "text-primary max-w-20 md:max-w-[100px] opacity-100"
                      : "text-white group-hover:text-primary max-w-0 opacity-0 lg:max-w-[100px] lg:opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavigationBar;
