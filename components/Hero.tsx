"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeadline from "./AnimatedHeadline";

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

    const ctx = gsap.context(() => {
      /* =========================
         CAR + BLACK BAND MOVEMENT
      ========================== */
      if (carRef.current && bandRef.current) {
        const travelDistance = () =>
          window.innerWidth + bandRef.current!.offsetWidth * 0.2;

        gsap.to([carRef.current, bandRef.current], {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
          x: travelDistance,
          ease: "none",
        });
      }

      /* =========================
         HEADLINE LETTER REVEAL
      ========================== */
      if (contentRef.current) {
        const letters = contentRef.current.querySelectorAll("span");

        gsap.set(letters, { y: 30, opacity: 0 });

        gsap.to(letters, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "12% top",
            end: "70% top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
          y: 0,
          opacity: 1,
          stagger: 0.03,
          ease: "power2.out",
        });
      }

      /* =========================
         STATS SEQUENCE (58 → 23 → 27 → 40)
      ========================== */
      if (statsAboveRef.current || statsBelowRef.current) {
        const aboveItems = Array.from(
          statsAboveRef.current?.querySelectorAll(".stat-item") || []
        );

        const belowItems = Array.from(
          statsBelowRef.current?.querySelectorAll(".stat-item") || []
        );

        const allStats = [...aboveItems, ...belowItems];

        // Sort by data-order so sequence stays exact
        const sorted = allStats.sort((a: any, b: any) => {
          return Number(a.dataset.order) - Number(b.dataset.order);
        });

        if (sorted.length) {
          gsap.set(sorted, { opacity: 0, y: 60 });

          gsap.to(sorted, {
            scrollTrigger: {
              trigger: heroRef.current,
              start: "20% top",
              end: "85% top",
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
            opacity: 1,
            y: 0,
            stagger: 0.28,
            ease: "power2.out",
          });
        }
      }
    }, heroRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[300vh] flex items-center justify-center overflow-hidden bg-gray-200"
    >
      {/* GREEN BACKGROUND BAND */}
      <div className="fixed top-1/2 left-0 w-screen h-40 bg-green-400 -translate-y-1/2 z-10" />

      {/* BLACK MOVING BAND */}
      <div
        ref={bandRef}
        className="fixed top-1/2 left-0 h-40 bg-gray-900 -translate-y-1/2 z-30 will-change-transform"
        style={{ width: "120vw" }}
      />

      {/* CAR */}
      <div
        ref={carRef}
        className="fixed top-1/2 left-0 -translate-y-1/2 z-40 will-change-transform"
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

      {/* HEADLINE */}
      <div
        ref={contentRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center"
        style={{ width: "100vw", padding: "0 20px" }}
      >
        <AnimatedHeadline />
      </div>

      {/* STATS ABOVE */}
      <div
        ref={statsAboveRef}
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{ top: "calc(50% - 260px)" }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div
            data-order="1"
            className="stat-item rounded-lg p-8 text-center min-w-[320px]"
            style={{ background: "#ccff33" }}
          >
            <p className="text-5xl md:text-6xl font-black text-black">58%</p>
            <p className="text-sm md:text-base font-semibold mt-2 text-black">
              Increase in pick up point use
            </p>
          </div>

          <div
            data-order="4"
            className="stat-item rounded-lg p-8 text-center min-w-[320px]"
            style={{ background: "#ff9a3c" }}
          >
            <p className="text-5xl md:text-6xl font-black text-black">40%</p>
            <p className="text-sm md:text-base font-semibold mt-2 text-black">
              Decreased in customer phone calls
            </p>
          </div>
        </div>
      </div>

      {/* STATS BELOW */}
      <div
        ref={statsBelowRef}
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{ top: "calc(50% + 120px)" }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div
            data-order="2"
            className="stat-item rounded-lg p-8 text-center min-w-[320px]"
            style={{ background: "#5ac8fa" }}
          >
            <p className="text-5xl md:text-6xl font-black text-black">23%</p>
            <p className="text-sm md:text-base font-semibold mt-2 text-black">
              Decreased in customer phone calls
            </p>
          </div>

          <div
            data-order="3"
            className="stat-item rounded-lg p-8 text-center min-w-[320px]"
            style={{ background: "#2c2c2c" }}
          >
            <p className="text-5xl md:text-6xl font-black text-white">27%</p>
            <p className="text-sm md:text-base font-semibold mt-2 text-white">
              Increase in pick up point use
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}