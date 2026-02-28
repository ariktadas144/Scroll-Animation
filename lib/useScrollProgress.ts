import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get viewport height
      const viewportHeight = window.innerHeight;
      
      // Get total scrollable distance (document height - viewport height)
      const totalScroll = document.documentElement.scrollHeight - viewportHeight;
      
      // Calculate progress (0 to 1)
      const scrollProgress = window.scrollY / totalScroll;
      
      // Clamp between 0 and 1
      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return progress;
}
