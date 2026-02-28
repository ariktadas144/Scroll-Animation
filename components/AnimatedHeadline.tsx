"use client";

import { useRef } from "react";

export default function AnimatedHeadline() {
  const textRef = useRef<HTMLHeadingElement>(null);

  const text = "WELCOME ITZFIZZ".split("");

  return (
    <h1
      ref={textRef}
      className="font-black text-black leading-none w-full"
      style={{
        fontSize: "clamp(3rem, 10vw, 8rem)",
        letterSpacing: "0.15em",
        textShadow: "0 10px 30px rgba(255,255,255,0.3)",
        whiteSpace: "nowrap",
      }}
    >
      {text.map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}