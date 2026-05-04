import fs from 'fs';
import { Stack } from './lib/contentstack';

async function fetchWikiImage(query: string): Promise<string | null> {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&utf8=`;
    const searchRes = await fetch(searchUrl, {
      headers: { 'User-Agent': 'IndiaTravelPortal/1.0 (test@example.com)' }
    });
    const searchData = await searchRes.json();

    const title = searchData?.query?.search?.[0]?.title;

    if (title) {
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const summaryRes = await fetch(summaryUrl, {
        headers: { 'User-Agent': 'IndiaTravelPortal/1.0 (test@example.com)' }
      });
      const summaryData = await summaryRes.json();

      if (summaryData?.originalimage?.source) {
        return String(summaryData.originalimage.source);
      }
    }
  } catch (e) {
    console.error("Error fetching image:", e);
  }

  return null;
}

async function run() {
  const destQ = await Stack.ContentType("destination").Query().toJSON().find();
  const destinations = destQ[0] as any[];

  const resortQ = await Stack.ContentType("resort").Query().toJSON().find();
  const resorts = resortQ[0] as any[];

  const map: Record<string, string> = {};

  for (const d of destinations) {
    const name = String(d?.name || "");
    if (!name) continue;

    console.log("Fetching image for destination:", name);

    const img = await fetchWikiImage(name + ' India');
    if (img) {
      map[name] = img;
    }
  }

  for (const r of resorts) {
    const title = String(r?.title || "");
    if (!title) continue;

    console.log("Fetching image for resort:", title);

    const img = await fetchWikiImage(title);
    if (img) {
      map[title] = img;
    }
  }

  const code = `export const imageMap: Record<string, string> = ${JSON.stringify(map, null, 2)};

export function getRealImage(name: string, fallback: string): string {
  return imageMap[name] || fallback;
}
`;

  fs.writeFileSync('lib/imageMap.ts', code);
  console.log("Generated lib/imageMap.ts!");
}

run();
