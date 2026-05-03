"use client";

import { useState, useEffect } from "react";

export default function PopupMessage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsRendered(true);
      // Small delay to allow CSS transition to work after mount
      setTimeout(() => setIsVisible(true), 50);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 500); // Wait for exit animation
  };

  if (!isRendered) return null;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[100] max-w-sm w-full p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] bg-white/90 backdrop-blur-xl border-2 border-pink-500 transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-95"
      }`}
    >
      <button 
        onClick={closePopup}
        className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 transition-colors bg-gray-100 hover:bg-pink-100 rounded-full w-8 h-8 flex items-center justify-center"
      >
        ✕
      </button>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl animate-pulse">
          ✨
        </div>
        <div>
          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            Welcome to NexBlog!
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Enjoy our colourful new experience filled with dynamic animations and vibrant content.
          </p>
        </div>
      </div>
    </div>
  );
}
