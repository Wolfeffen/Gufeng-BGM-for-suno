#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.resolve(__dirname, "..", "styles", "gufeng-styles.json");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (key.startsWith("--") && argv[i + 1] && !argv[i + 1].startsWith("--")) {
      args[key.slice(2)] = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function findProfile(profiles, key) {
  const k = normalize(key) || "b";
  const match = profiles.find(
    (profile) => profile.key === k || profile.id === k || normalize(profile.name) === k,
  );
  return match || profiles.find((profile) => profile.key === "b");
}

function findRegion(regions, key) {
  const k = String(key || "").trim();
  if (!k) {
    return null;
  }
  const names = Object.keys(regions);
  for (const name of names) {
    const region = regions[name];
    if (k.includes(name) || name.includes(k)) {
      return { id: name, ...region };
    }
    for (const alias of region.aliases || []) {
      if (k.includes(alias) || alias.includes(k)) {
        return { id: name, ...region };
      }
    }
  }
  return null;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const profile = findProfile(data.profiles, args.archetype);
  const region = findRegion(data.regions, args.region);
  const scene = args.scene || "古建光影与空间漫步";
  const structure = args.structure || "两段式，先建立空间氛围，再缓慢推进";
  const duration = args.duration ? `时长约 ${args.duration} 秒。` : "";
  const mood = args.mood || profile.mood_words;
  const tempo = args.tempo || profile.tempo_words;
  const vocal = String(args.vocal || "").toLowerCase();
  const wantsVocal =
    vocal.includes("ethereal") || vocal.includes("空灵") || vocal.includes("吟唱");
  const vocalText = wantsVocal
    ? "，悠扬空灵的女声无词吟唱，轻盈气声，飘浮感"
    : "";
  const regionDescription = region ? `，融入${region.sound}` : "";
  const regionTags = region ? `，${region.tags.join("，")}` : "";
  const description = `${scene}，纯背景音乐无歌词。${structure}${regionDescription}。${duration}`;
  const style = `古风，氛围音乐，民族乐器，${profile.suno_style}${vocalText}${regionTags}`;
  const prompt = [
    `描述：${description}`,
    `风格：${style}`,
    `情绪：${mood}`,
    `节奏：${tempo}`,
  ].join("\n");
  process.stdout.write(prompt + "\n");
}

main();
