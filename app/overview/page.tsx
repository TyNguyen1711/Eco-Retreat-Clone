"use client";
import UserGuide from "@/components/UserGuide";
import Panorama360Viewer from "@/components/PanoramaViewer";
import EcoRetreatNav from "@/components/Navigation";
import { useState } from "react";

const OverviewPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Panorama360Viewer />
      <EcoRetreatNav setIsOpen={setIsOpen} />

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" />
      )}

      <UserGuide isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default OverviewPage;
