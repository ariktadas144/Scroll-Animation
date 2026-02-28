"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeadline from "./AnimatedHeadline";
import Stats from "./Stats";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const carRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsAboveRef = useRef<HTMLDivElement>(null);
  const statsBelowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Car scroll animation - moves right
    if (carRef.current) {
      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          markers: false,
        },
        // match the band travel so the car stays aligned with the strip edge
        x: window.innerWidth * 1.4,
        ease: "none",
      });
    }

    // Dark band moves with car, revealing text - much wider band
    if (bandRef.current) {
      gsap.to(bandRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          markers: false,
        },
        x: window.innerWidth * 1.4,
        ease: "none",
      });
    }

    // Combined stats sequence (58 -> 23 -> 27 -> 40)
    if (statsAboveRef.current || statsBelowRef.current) {
      const aboveItems = Array.from(statsAboveRef.current?.querySelectorAll(".stat-item") || []);
      const belowItems = Array.from(statsBelowRef.current?.querySelectorAll(".stat-item") || []);
      const all = (aboveItems.concat(belowItems));
      // sort by explicit data-order attribute so we control exact sequence
      const sorted = all.sort((a: any, b: any) => {
        const ao = Number(a.dataset.order || 0);
        const bo = Number(b.dataset.order || 0);
        return ao - bo;
      });

      if (sorted.length) {
        gsap.set(sorted, { opacity: 0, y: 50 });
        gsap.to(sorted, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "18% top",
            end: "85% top",
            scrub: 1.1,
            markers: false,
          },
          opacity: 1,
          y: 0,
          stagger: 0.28,
          ease: "power2.out",
        });
      }
    }

    // Headline letters reveal tied to scroll (letters start hidden via markup)
    if (contentRef.current) {
      const letters = contentRef.current.querySelectorAll("span");
      if (letters && letters.length) {
        gsap.set(letters, { y: 30, opacity: 0 });
        gsap.to(letters, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "10% top",
            end: "80% top",
            scrub: 1.2,
            markers: false,
          },
          y: 0,
          opacity: 1,
          stagger: 0.03,
          ease: "power2.out",
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full min-h-[300vh] flex flex-col items-center justify-center overflow-visible bg-gray-200"
      >
        {/* Dark horizontal band - reveals text as it moves (covers full width) */}
        <div
          ref={bandRef}
          className="fixed top-1/2 left-0 h-40 bg-gray-900 z-30 will-change-transform pointer-events-none -translate-y-1/2"
          style={{
            width: "120vw",
          }}
        ></div>

        {/* Car Animation - smaller size, starts on left */}
        <div
          ref={carRef}
          className="fixed top-1/2 left-0 will-change-transform z-40 pointer-events-none -translate-y-1/2"
        >
          <Image
            src="/car.svg"
            alt="Car"
            width={300}
            height={150}
            priority
            className="drop-shadow-2xl"
          />
        </div>

        {/* Green background band - full width behind text */}
        <div
          className="fixed top-1/2 left-0 w-screen h-40 bg-green-400 z-9 pointer-events-none -translate-y-1/2"
        ></div>

        {/* Text - hidden under the dark band initially, on green background */}
        <div
          ref={contentRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none"
          style={{
            width: "100vw",
            paddingLeft: "20px",
            paddingRight: "20px",
            boxSizing: "border-box",
          }}
        >
          <AnimatedHeadline />
        </div>

        {/* Stats above - appears as band moves */}
        <div
          ref={statsAboveRef}
          className="fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ top: "calc(50% - 260px)" }}
        >
          <div className="grid grid-cols-2 gap-6 items-start">
            <div data-order="1" className="stat-item rounded-lg p-8 text-center min-w-[320px]" style={{ background: "#ccff33" }}>
              <p className="text-5xl md:text-6xl font-black text-black">58%</p>
              <p className="text-sm md:text-base font-semibold text-black mt-2">Increase in pick up point use</p>
            </div>
            <div data-order="4" className="stat-item rounded-lg p-8 text-center min-w-[320px]" style={{ background: "#ff9a3c" }}>
              <p className="text-5xl md:text-6xl font-black text-black">40%</p>
              <p className="text-sm md:text-base font-semibold text-black mt-2">Decreased in customer phone calls</p>
            </div>
          </div>
        </div>

        {/* Stats below - appears as band moves */}
        <div
          ref={statsBelowRef}
          className="fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ top: "calc(50% + 120px)" }}
        >
          <div className="grid grid-cols-2 gap-6 items-start">
            <div data-order="2" className="stat-item rounded-lg p-8 text-center min-w-[320px]" style={{ background: "#5ac8fa" }}>
              <p className="text-5xl md:text-6xl font-black text-black">23%</p>
              <p className="text-sm md:text-base font-semibold text-black mt-2">Decreased in customer phone calls</p>
            </div>
            <div data-order="3" className="stat-item rounded-lg p-8 text-center min-w-[320px]" style={{ background: "#2c2c2c" }}>
              <p className="text-5xl md:text-6xl font-black text-white">27%</p>
              <p className="text-sm md:text-base font-semibold text-white mt-2">Increase in pick up point use</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}