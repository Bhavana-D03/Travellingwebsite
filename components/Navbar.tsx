"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/40 backdrop-blur-xl shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse"></div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600 group-hover:from-indigo-600 group-hover:to-pink-600 transition-all duration-500">
            IndiaBook <span className="text-2xl ml-1 animate-bounce inline-block">🌴</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="relative text-sm font-bold text-indigo-900 hover:text-pink-600 transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="/destinations"
            className="relative text-sm font-bold text-indigo-900 hover:text-pink-600 transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-pink-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            Destinations
          </Link>
        </nav>
      </div>
    </header>
  );
}
