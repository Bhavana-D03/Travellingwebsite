import fs from 'fs';
import { Stack } from './lib/contentstack';

async function fetchWikiImage(query) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&utf8=`;
    const searchRes = await fetch(searchUrl, { headers: { 'User-Agent': 'IndiaTravelPortal/1.0 (test@example.com)' } });
    const searchData = await searchRes.json();
    const title = searchData.query?.search?.[0]?.title;

    if (title) {
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const summaryRes = await fetch(summaryUrl, { headers: { 'User-Agent': 'IndiaTravelPortal/1.0 (test@example.com)' } });
      const summaryData = await summaryRes.json();
      if (summaryData.originalimage?.source) {
        return summaryData.originalimage.source;
      }
    }
  } catch (e) {}
  return null;
}

async function run() {
  const destQ = await Stack.ContentType("destination").Query().toJSON().find();
  const destinations = destQ[0];
  const resortQ = await Stack.ContentType("resort").Query().toJSON().find();
  const resorts = resortQ[0];

  const map = {};

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

  const code = `export const imageMap: Record<string, string> = ${JSON.stringify(map, null, 2)};\n\nexport function getRealImage(name: string, fallback: string): string {\n  return imageMap[name] || fallback;\n}\n`;
  fs.writeFileSync('lib/imageMap.ts', code);
  console.log("Generated lib/imageMap.ts!");
}

run();
