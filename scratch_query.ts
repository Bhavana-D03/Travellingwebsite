import fs from 'fs';
import { imageMap } from './lib/imageMap.ts';

const newMap: Record<string, string> = {};

for (const [key, value] of Object.entries(imageMap)) {
  newMap[key.toLowerCase()] = value;
}

// Add common aliases/typos
newMap["taj exotic andamans"] = newMap["taj exotica andamans"] || "https://images.unsplash.com/photo-1623062828690-349f80de9ce5?q=80&w=800";
newMap["andama islands"] = newMap["andaman islands"] || "https://images.unsplash.com/photo-1623062828690-349f80de9ce5?q=80&w=800";
newMap["andama island"] = newMap["andaman island"] || "https://images.unsplash.com/photo-1623062828690-349f80de9ce5?q=80&w=800";

const code = `export const imageMap: Record<string, string> = ${JSON.stringify(newMap, null, 2)};

export function getRealImage(name: string, fallback: string): string {
  if (!name) return fallback;
  return imageMap[name.trim().toLowerCase()] || fallback;
}
`;

fs.writeFileSync('lib/imageMap.ts', code);
console.log("Updated imageMap!");
