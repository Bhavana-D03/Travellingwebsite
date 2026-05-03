import { Stack } from "../../lib/contentstack";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getRealImage } from "../../lib/imageMap";

async function getDestinations() {
  const Query = Stack.ContentType("destination").Query();
  const data = await Query.toJSON().find();
  return data?.[0] || [];
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated background blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex-grow relative z-10">
        <div className="mb-20 max-w-2xl text-center mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-purple-200 shadow-sm mb-6 text-sm font-bold text-purple-600 backdrop-blur-md animate-float">
            <span>🌍</span> Explore the World
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
            Top Destinations
          </h2>
          <p className="text-xl leading-8 text-indigo-900/80 font-medium">
            Discover the most beautiful, luxurious, and exotic locations across India for your next unforgettable getaway.
          </p>
        </div>

        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16">
          {destinations.map((destination: any, index: number) => {
            const delayClass = index % 3 === 0 ? "" : index % 3 === 1 ? "delay-100" : "delay-200";
            return (
              <li key={destination.uid} className={`animate-fade-in-up ${delayClass}`}>
                <Link href={`/destinations/${destination.uid}`} className="group flex flex-col items-center gap-y-6 bg-white/50 backdrop-blur-sm border-2 border-transparent hover:border-pink-400 rounded-3xl p-8 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(236,72,153,0.5)] hover:-translate-y-2 text-center h-full relative overflow-hidden cursor-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full animate-pulse blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <img 
                      alt={destination.name} 
                      src={getRealImage(destination.name, destination.profile_image?.url || `https://loremflickr.com/400/400/${encodeURIComponent(destination.name)},india,landmark/all`)} 
                      className="relative h-40 w-40 rounded-full object-cover bg-white p-1 ring-4 ring-purple-100 group-hover:ring-pink-300 transition-all duration-500 z-10"
                    />
                  </div>
                  <div className="z-10 relative">
                    <h3 className="text-2xl font-black leading-7 tracking-tight text-indigo-950 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300">
                      {destination.name}
                    </h3>
                    <p className="mt-2 inline-block px-3 py-1 rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                      Destination 📍
                    </p>
                    {destination.bio && (
                      <div 
                        className="mt-4 text-sm leading-6 text-indigo-900/70 font-medium line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: destination.bio }}
                      />
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
