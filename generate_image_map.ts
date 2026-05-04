import fs from 'fs';
import { Stack } from './lib/contentstack';

type Destination = {
  name: string;
};

type Resort = {
  title: string;
};

async function fetchWikiImage(query: string): Promise<string | null> {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&utf8=`;
    const searchRes = await fetch(searchUrl, {
      headers: { 'User-Agent': 'IndiaTravelPortal/1.0 (test@example.com)' }
    });
    const searchData = await searchRes.json();
    const title = searchData.query?.search?.[0]?.title;

    if (title) {
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const summaryRes = await fetch(summaryUrl, {
        headers: { 'User-Agent': 'IndiaTravelPortal/1.0 (test@example.com)' }
      });
      const summaryData = await summaryRes.json();

      if (summaryData.originalimage?.source) {
        return summaryData.originalimage.source as string;
      }
    }
  } catch (e) {
    console.error("Error fetching image:", e);
  }
  return null;
}

async function run() {
  const destQ = await Stack.ContentType("destination").Query().toJSON().find();
  const destinations = destQ[0] as Destination[];

  const resortQ = await Stack.ContentType("resort").Query().toJSON().find();
  const resorts = resortQ[0] as Resort[];

  const map: Record<string, string> = {};

  for (const d of destinations) {
    console.log("Fetching image for destination:", d.name);
    const img = await fetchWikiImage(d.name + ' India');
    if (img) map[d.name] = img;
  }

  for (const r of resorts) {
    console.log("Fetching image for resort:", r.title);
    const img = await fetchWikiImage(r.title);
    if (img) map[r.title] = img;
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
