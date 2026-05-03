"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1.5 z-[100] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(236,72,153,0.8)]" 
      style={{ width: `${progress}%` }} 
    />
  );
}
