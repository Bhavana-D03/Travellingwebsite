"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer glowing aura */}
      <div 
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9998] mix-blend-multiply filter blur-sm transition-transform duration-300 ease-out hidden sm:block"
        style={{
          transform: `translate(${position.x - 32}px, ${position.y - 32}px) scale(${isPointer ? 1.5 : 1})`,
          background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.2) 40%, rgba(0,0,0,0) 70%)',
        }}
      />
      {/* Inner sharp dot */}
      <div 
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-full pointer-events-none z-[9999] hidden sm:block transition-transform duration-75"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px) scale(${isPointer ? 0.5 : 1})`,
          boxShadow: '0 0 15px rgba(236,72,153,0.8)',
        }}
      />
    </>
  );
}
