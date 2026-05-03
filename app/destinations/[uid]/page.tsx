import { Stack } from "../../../lib/contentstack";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getRealImage } from "../../../lib/imageMap";

async function getDestinationData(uid: string) {
  const destQ = await Stack.ContentType("destination").Query().where("uid", uid).toJSON().find();
  const destination = destQ?.[0]?.[0];

  const resortQ = await Stack.ContentType("resort").Query().includeReference(["author"]).toJSON().find();
  const allResorts = resortQ?.[0] || [];
  
  const destinationResorts = allResorts.filter((r: any) => {
    if (Array.isArray(r.author)) {
      return r.author.some((a: any) => a.uid === uid);
    }
    return r.author?.uid === uid;
  });

  return { destination, destinationResorts };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const { destination, destinationResorts } = await getDestinationData(uid);

  if (!destination) {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-20 text-center relative z-10">
          <p className="text-pink-500 text-2xl font-bold bg-white/60 p-8 rounded-3xl backdrop-blur-md shadow-sm border border-pink-200">Destination not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated background blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex-grow relative z-10">
        {/* Vibrant Destination Header */}
        <div className="md:flex md:items-center md:justify-between mb-24 pb-16 border-b border-purple-200/50 animate-fade-in-up">
          <div className="min-w-0 flex-1 flex flex-col md:flex-row md:items-center gap-8 bg-white/40 p-8 rounded-3xl backdrop-blur-md border border-white/60 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)]">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full animate-pulse blur-md opacity-60"></div>
              <img 
                src={getRealImage(destination.name, destination.profile_image?.url || `https://loremflickr.com/400/400/${encodeURIComponent(destination.name)},india,landmark/all`)} 
                alt={destination.name}
                className="relative h-40 w-40 rounded-full object-cover ring-4 ring-white shadow-xl z-10 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-purple-200 text-xs font-bold text-purple-700 shadow-sm animate-float">
                📍 Featured Location
              </div>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                {destination.name}
              </h1>
              {destination.bio && (
                <div 
                  className="text-lg leading-8 text-indigo-950/80 font-medium max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: destination.bio }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Resorts Section */}
        <div className="animate-fade-in-up delay-200">
          <h2 className="text-3xl font-black tracking-tight mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
            Resorts in {destination.name}
          </h2>

          {destinationResorts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {destinationResorts.map((resort: any, index: number) => {
                const delayClass = index % 3 === 0 ? "" : index % 3 === 1 ? "delay-100" : "delay-200";
                return (
                  <article key={resort.uid} className={`flex flex-col items-start group animate-fade-in-up ${delayClass}`}>
                    <Link href={`/resorts/${resort.url.replace(/^\/?(resort\/)?/, '')}`} className="w-full">
                      <div className="relative w-full overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border-2 border-transparent group-hover:border-pink-400 aspect-[4/3] mb-6 transition-all duration-500 group-hover:shadow-[0_20px_50px_-12px_rgba(236,72,153,0.5)] group-hover:-translate-y-2 group-hover:rotate-1 cursor-none">
                        <img
                          src={getRealImage(resort.title, resort.featured_image?.url || `https://loremflickr.com/800/600/${encodeURIComponent(destination.name)},resort/all`)}
                          alt={resort.title ?? "Resort thumbnail"}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                      <h3 className="mt-3 text-2xl font-black leading-tight text-indigo-950 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-indigo-600 transition-all duration-300 line-clamp-2">
                        <Link href={`/resorts/${resort.url.replace(/^\/?(resort\/)?/, '')}`}>
                          <span className="absolute inset-0" />
                          {resort.title}
                        </Link>
                      </h3>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-12 text-center border border-purple-200">
              <p className="text-indigo-900/60 text-xl font-bold">No resorts available here yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
