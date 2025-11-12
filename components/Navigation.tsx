// "use client";

// import { Dispatch, SetStateAction, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import Logo from "../assets/logo/logo.png";
// import arrow from "../assets/icons/arrow-down.png";
// import {
//   BookIcon,
//   GlobeIcon,
//   GridIcon,
//   ImageIcon,
//   LocationIcon,
//   StarIcon,
// } from "./Icon";

// interface NavItem {
//   id: string;
//   label: string;
//   icon: any;
//   href: string;
// }

// export default function NavigationBar({
//   setIsOpen,
// }: {
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   const [activeTab, setActiveTab] = useState("toan-canh");
//   const [isVisible, setIsVisible] = useState(true);

//   const navItems: NavItem[] = [
//     {
//       id: "toan-canh",
//       label: "TOÀN CẢNH",
//       icon: <GlobeIcon />,

//       href: "#toan-canh",
//     },
//     {
//       id: "vi-tri",
//       label: "VỊ TRÍ",
//       icon: <LocationIcon />,
//       href: "#vi-tri",
//     },
//     {
//       id: "phan-khu",
//       label: "PHÂN KHU",
//       icon: <GridIcon />,
//       href: "#phan-khu",
//     },
//     {
//       id: "tien-ich",
//       label: "TIỆN ÍCH",
//       icon: <StarIcon />,
//       href: "#tien-ich",
//     },
//     {
//       id: "gallery",
//       label: "GALLERY",
//       icon: <ImageIcon />,
//       href: "#gallery",
//     },
//     {
//       id: "e-brochure",
//       label: "E-BROCHURE",
//       icon: <BookIcon />,
//       href: "#e-brochure",
//     },
//   ];

//   return (
//     <nav className="fixed w-full max-w-[90%] md:h-16 bottom-0 left-1/2 -translate-x-1/2">
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsVisible(!isVisible)}
//         className={`absolute left-1/2 -translate-x-1/2 text-white shadow-lg md:h-6 px-10 md:px-18 bg-primary/85 hover:bg-primary
//           w-16 h-4 flex items-center justify-center transition-all duration-300  bottom-0 cursor-pointer z-50 ${
//             isVisible
//               ? "rounded-b-xl md:rounded-b-2xl"
//               : "rounded-t-xl md:rounded-t-2xl"
//           }`}
//       >
//         <Image
//           src={arrow}
//           className={`transition-transform duration-300 z-100 ${
//             isVisible ? "" : "rotate-180"
//           }`}
//           style={{ objectFit: "contain" }}
//           alt="Eco Retreat Logo"
//           fill
//           priority
//         />
//       </button>

//       <div
//         style={{
//           transform: isVisible ? "translateY(0)" : "translateY(140%)",
//           transition: "transform 300ms ease-in-out",
//           pointerEvents: isVisible ? "auto" : "none",
//         }}
//         className={`bg-primary backdrop-blur-sm rounded-2xl shadow-lg  md:pl-3 -translate-y-4 md:-translate-y-6`}
//       >
//         <div className="flex items-center gap-2 flex-1">
//           {/* Logo */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="flex items-center gap-2 px-3 hover:opacity-80 transition-opacity shrink-0 cursor-pointer"
//           >
//             <Image
//               src={Logo}
//               alt="LOGO"
//               width={160}
//               height={40} // Thêm height tương ứng
//               className="w-[100px] md:w-[160px] h-auto"
//             />
//           </button>

//           {/* Navigation Items */}
//           <div className="flex flex-1 overflow-x-auto scrollbar-hide">
//             {navItems.map((item) => (
//               <Link
//                 key={item.id}
//                 href={item.href}
//                 onClick={() => setActiveTab(item.id)}
//                 className={`
//                   flex flex-1 items-center gap-2 py-4 md:py-4 rounded-2xl text-sm font-semibold
//                   transition-all duration-300 whitespace-nowrap justify-center
//                   ${
//                     activeTab === item.id
//                       ? "bg-white text-primary shadow-[0_12px_30px_rgba(255,255,255,0.8)] px-4 lg:px-0"
//                       : "text-white hover:bg-white/20"
//                   }
//                 `}
//               >
//                 <span
//                   className={`flex items-center justify-center transition-all flex-shrink-0`}
//                 >
//                   {item.icon}
//                 </span>
//                 <span
//                   className={`text-[10px] md:text-xs text-center uppercase font-semibold transition-all duration-300 overflow-hidden ${
//                     activeTab === item.id
//                       ? "text-primary max-w-[80px] md:max-w-[100px] opacity-100"
//                       : "text-white max-w-0 opacity-0 lg:max-w-[100px] lg:opacity-100"
//                   }`}
//                 >
//                   {item.label}
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
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

interface NavItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

export default function NavigationBar({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [activeTab, setActiveTab] = useState("toan-canh");
  const [isVisible, setIsVisible] = useState(true);

  const navItems: NavItem[] = [
    {
      id: "toan-canh",
      label: "TOÀN CẢNH",
      icon: <GlobeIcon />,

      href: "#toan-canh",
    },
    {
      id: "vi-tri",
      label: "VỊ TRÍ",
      icon: <LocationIcon />,
      href: "#vi-tri",
    },
    {
      id: "phan-khu",
      label: "PHÂN KHU",
      icon: <GridIcon />,
      href: "#phan-khu",
    },
    {
      id: "tien-ich",
      label: "TIỆN ÍCH",
      icon: <StarIcon />,
      href: "#tien-ich",
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
      href: "#e-brochure",
    },
  ];

  return (
    <nav className="fixed w-full max-w-[90%] md:h-16 bottom-0 left-1/2 -translate-x-1/2">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`absolute left-1/2 -translate-x-1/2 text-white shadow-lg md:h-6 px-10 md:px-18 bg-primary/85 hover:bg-primary
          w-16 h-4 flex items-center justify-center transition-all duration-300  bottom-0 cursor-pointer z-50 ${
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
          {/* Logo */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-2 sm:px-3 hover:opacity-80 transition-opacity shrink-0 cursor-pointer"
          >
            <Image
              src={Logo}
              alt="LOGO"
              width={160}
              height={60}
              className="w-[60px] xs:w-[80px] sm:w-[100px] md:w-[160px] h-auto"
            />
          </button>

          {/* Navigation Items */}
          <div className="flex flex-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex flex-1 items-center gap-1 md:gap-2 py-4 md:py-4 rounded-2xl text-sm font-semibold
                  transition-all duration-300 whitespace-nowrap justify-center
                  ${
                    activeTab === item.id
                      ? "bg-white text-primary shadow-[0_12px_30px_rgba(255,255,255,0.8)] px-1 lg:px-0"
                      : "text-white hover:bg-white/20"
                  }
                `}
              >
                <span
                  className={`flex items-center justify-center transition-all`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-[8px] md:text-xs text-center uppercase font-semibold transition-all duration-300 overflow-hidden ${
                    activeTab === item.id
                      ? "text-primary max-w-[80px] md:max-w-[100px] opacity-100"
                      : "text-white max-w-0 opacity-0 lg:max-w-[100px] lg:opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
