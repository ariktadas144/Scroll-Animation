"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = statsRef.current?.children;

    if (items) {
      // Quick entrance animation for each stat
      gsap.fromTo(
        items,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out",
        }
      );
    }
  }, []);

  return (
    <div
      ref={statsRef}
      className="grid grid-cols-2 gap-6 mt-16"
    >
      <div className="bg-lime-400 rounded-lg p-6 text-center">
        <p className="text-5xl md:text-6xl font-black text-black">58%</p>
        <p className="text-sm font-semibold text-black mt-2">Increase in pick up point use</p>
      </div>
      <div className="bg-blue-400 rounded-lg p-6 text-center">
        <p className="text-5xl md:text-6xl font-black text-black">23%</p>
        <p className="text-sm font-semibold text-black mt-2">Decreased in customer phone calls</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-5xl md:text-6xl font-black text-white">27%</p>
        <p className="text-sm font-semibold text-white mt-2">Increase in pick up point use</p>
      </div>
      <div className="bg-orange-500 rounded-lg p-6 text-center">
        <p className="text-5xl md:text-6xl font-black text-black">40%</p>
        <p className="text-sm font-semibold text-black mt-2">Decreased in customer phone calls</p>
      </div>
    </div>
  );
}