import { Stack } from "../lib/contentstack";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getRealImage } from "../lib/imageMap";

async function getResorts() {
  const Query = Stack.ContentType("resort").Query();
  const data = await Query.includeReference(["author"]).toJSON().find();
  return data?.[0] || [];
}

export default async function Home() {
  const resorts = await getResorts();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated background blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex-grow relative z-10">
        {/* Floating Emojis / Confetti Elements */}
        <div className="absolute top-20 left-[10%] text-4xl animate-float opacity-70 pointer-events-none">🧳</div>
        <div className="absolute top-40 left-[80%] text-5xl animate-float animation-delay-2000 opacity-60 pointer-events-none">🌴</div>
        <div className="absolute top-60 left-[20%] text-3xl animate-float animation-delay-4000 opacity-50 pointer-events-none">✈️</div>
        <div className="absolute top-32 right-[25%] text-4xl animate-float animation-delay-2000 opacity-70 pointer-events-none">🍹</div>

        {/* Vibrant Hero */}
        <div className="mb-24 max-w-3xl text-center mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-pink-200 shadow-sm mb-6 text-sm font-bold text-pink-600 backdrop-blur-md animate-float">
            <span>🏖️</span> Discover Incredible India
          </div>
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
            Luxury Escapes
          </h1>
          <p className="text-xl leading-8 text-indigo-900/80 font-medium">
            Book your dream vacation in India's most luxurious and breathtaking resorts. Unwind in paradise.
          </p>
        </div>

        {/* Resort Cards Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {resorts.map((resort: any, index: number) => {
            const destinationName = Array.isArray(resort.author) ? resort.author[0]?.name : resort.author?.name;
            const destinationUid = Array.isArray(resort.author) ? resort.author[0]?.uid : resort.author?.uid;
            
            // Stagger animation for cards
            const delayClass = index % 3 === 0 ? "" : index % 3 === 1 ? "delay-100" : "delay-200";

            return (
              <article key={resort.uid} className={`flex flex-col items-start group animate-fade-in-up ${delayClass}`}>
                <Link href={`/resorts/${resort.url.replace(/^\/?(resort\/)?/, '')}`} className="w-full">
                  <div className="relative w-full overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border-2 border-transparent group-hover:border-pink-400 aspect-[4/3] mb-6 transition-all duration-500 group-hover:shadow-[0_20px_50px_-12px_rgba(236,72,153,0.5)] group-hover:-translate-y-2 group-hover:rotate-1 cursor-none">
                    <img
                      src={getRealImage(resort.title, resort.featured_image?.url || `https://loremflickr.com/800/600/${encodeURIComponent(destinationName || resort.title || 'india')},resort/all`)}
                      alt={resort.title ?? "Resort thumbnail"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="text-white font-black text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Book Now &rarr;</span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center justify-between w-full text-xs mb-3">
                  <span className="font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
                    ⭐ {resort.rating}
                  </span>
                  <span className="font-black text-lg text-indigo-950">
                    {resort.price}
                  </span>
                </div>

                <div className="group relative cursor-none">
                  <h3 className="mt-2 text-2xl font-black leading-tight text-indigo-950 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300 line-clamp-2">
                    <Link href={`/resorts/${resort.url.replace(/^\/?(resort\/)?/, '')}`}>
                      <span className="absolute inset-0" />
                      {resort.title}
                    </Link>
                  </h3>
                </div>
                
                <p className="mt-2 text-sm text-indigo-900/70 font-medium">
                  {resort.amenities}
                </p>

                <div className="relative mt-4 flex items-center gap-x-3 bg-white/60 px-4 py-2 rounded-full border border-purple-100 shadow-sm group-hover:bg-pink-50 transition-colors w-full">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm shadow-inner">
                    📍
                  </div>
                  <div className="text-sm leading-6 flex-grow">
                    <p className="font-bold text-indigo-900">
                      {destinationUid ? (
                        <Link href={`/destinations/${destinationUid}`} className="hover:text-pink-600 transition-colors cursor-none relative z-10">
                          {destinationName}
                        </Link>
                      ) : (
                        "Unknown Destination"
                      )}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
