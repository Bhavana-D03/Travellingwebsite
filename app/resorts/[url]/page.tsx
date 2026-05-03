import { Stack } from "../../../lib/contentstack";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import BookingWidget from "@/components/BookingWidget";
import { getRealImage } from "../../../lib/imageMap";

async function getResort(url: string) {
  let Query = Stack.ContentType("resort").Query().where("url", url);
  let data = await Query.includeReference(["author"]).toJSON().find();

  if (!data?.[0]?.[0]) {
    Query = Stack.ContentType("resort").Query().where("url", `/${url}`);
    data = await Query.includeReference(["author"]).toJSON().find();
  }

  if (!data?.[0]?.[0]) {
    Query = Stack.ContentType("resort").Query().where("url", `/resort/${url}`);
    data = await Query.includeReference(["author"]).toJSON().find();
  }

  return data?.[0]?.[0] ?? null;
}

export default async function ResortPage({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { url } = await params;
  const resort = await getResort(url);

  if (!resort) {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-20 text-center relative z-10">
          <p className="text-pink-500 text-2xl font-bold bg-white/60 p-8 rounded-3xl backdrop-blur-md shadow-sm border border-pink-200">Resort not found.</p>
        </div>
      </div>
    );
  }

  const destinationName = Array.isArray(resort.author) ? resort.author[0]?.name : resort.author?.name;
  const destinationUid = Array.isArray(resort.author) ? resort.author[0]?.uid : resort.author?.uid;
  const destinationImage = Array.isArray(resort.author) ? resort.author[0]?.profile_image?.url : resort.author?.profile_image?.url;

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <ReadingProgress />
      {/* Animated background blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 animate-fade-in-up">
        <header className="mb-14 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold text-sm shadow-sm">
              ⭐ {resort.rating}
            </span>
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-black text-sm shadow-sm">
              {resort.price}
            </span>
          </div>
          
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-2">
            {resort.title}
          </h1>
          
          <div className="flex items-center justify-center gap-x-4 bg-white/40 inline-flex mx-auto p-3 pr-6 rounded-full backdrop-blur-md border border-white/60 shadow-[0_4px_20px_-5px_rgba(168,85,247,0.2)] hover:scale-105 transition-transform duration-300 cursor-none">
            {getRealImage(destinationName, destinationImage || "") ? (
              <img src={getRealImage(destinationName, destinationImage || "")} alt={destinationName} className="h-12 w-12 rounded-full bg-white p-0.5 ring-2 ring-purple-200 object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {destinationName ? destinationName.charAt(0) : "📍"}
              </div>
            )}
            <div className="text-sm leading-5">
              <p className="font-bold text-indigo-950">
                {destinationUid ? (
                  <Link href={`/destinations/${destinationUid}`} className="hover:text-pink-600 transition-colors cursor-none">
                    {destinationName}
                  </Link>
                ) : (
                  <span>Unknown Location</span>
                )}
              </p>
              <p className="text-purple-600 font-medium text-left">Location 📍</p>
            </div>
          </div>
        </header>

        <div className="mb-12 overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm p-2 ring-1 ring-purple-200 shadow-xl aspect-[16/9] animate-fade-in-up delay-100 relative group cursor-none">
          <img
            src={getRealImage(resort.title, resort.featured_image?.url || `https://loremflickr.com/800/600/${encodeURIComponent(destinationName || resort.title || 'india')},resort/all`)}
            alt={resort.title ?? "Resort image"}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
          />
          <BookingWidget 
            resortName={resort.title}
            resortPrice={resort.price}
            resortImage={getRealImage(resort.title, resort.featured_image?.url || "")}
            destinationName={destinationName || "Unknown Location"}
          />
        </div>

        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/60 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] animate-fade-in-up delay-200">
          <div className="mb-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-2">Resort Amenities</h3>
            <p className="text-indigo-800/80 font-medium">{resort.amenities}</p>
          </div>
          
          <div
            className="prose prose-lg max-w-none text-indigo-950/80 prose-headings:text-indigo-950 prose-headings:font-black prose-a:text-pink-600 hover:prose-a:text-purple-600 prose-img:rounded-2xl prose-img:shadow-lg prose-strong:text-indigo-900 leading-relaxed marker:text-pink-500 cursor-none"
            dangerouslySetInnerHTML={{ __html: resort.content }}
          />
        </div>
      </main>
    </div>
  );
}
