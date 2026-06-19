import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { audioSummaries } from "../src/data/content.js";

async function loadLocalEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const body = await readFile(join(process.cwd(), file), "utf8");
      for (const line of body.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
        if (!match) continue;

        const [, key, rawValue] = match;
        const value = rawValue.replace(/^['"]|['"]$/g, "");
        if (!process.env[key]) process.env[key] = value;
      }
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

await loadLocalEnv();

const apiKey = process.env.ELEVENLABS_API_KEY;
const outputDir = join(process.cwd(), "assets", "audio");
const outputFormat = process.env.ELEVENLABS_OUTPUT_FORMAT ?? "mp3_44100_128";
const modelId = process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";

const voiceIds = {
  en: process.env.ELEVENLABS_EN_VOICE_ID ?? "lxYfHSkYm1EzQzGhdbfc",
  zh: process.env.ELEVENLABS_ZH_VOICE_ID ?? "MNwNcuqILoUHnUG7B9kO"
};

const languageCodes = {
  en: "en",
  zh: "zh"
};

const slugs = {
  "launch-site": "launch-site",
  rocket: "rocket",
  satellite: "satellite",
  "ground-station": "space-station",
  applications: "applications"
};

function assertConfigured() {
  if (!apiKey) {
    throw new Error("Missing ELEVENLABS_API_KEY. Set it in your shell before running this script.");
  }
}

async function createSpeech({ lang, voiceId, text }) {
  const endpoint = new URL(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`);
  endpoint.searchParams.set("output_format", outputFormat);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      language_code: languageCodes[lang],
      voice_settings: {
        stability: 0.48,
        similarity_boost: 0.78,
        style: 0.18,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs request failed (${response.status}) for ${lang}: ${errorText}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

assertConfigured();
await mkdir(outputDir, { recursive: true });

const manifest = {
  generatedAt: new Date().toISOString(),
  modelId,
  outputFormat,
  voices: voiceIds,
  files: []
};

for (const summary of audioSummaries) {
  const slug = slugs[summary.nodeId] ?? summary.nodeId;

  for (const lang of ["en", "zh"]) {
    const script = summary.copy[lang]?.script;
    const title = summary.copy[lang]?.title;
    const voiceId = voiceIds[lang];
    const fileName = `${lang}-${slug}.mp3`;
    const filePath = join(outputDir, fileName);

    if (!script || !voiceId) continue;

    console.log(`Generating ${fileName} (${title})...`);
    const audio = await createSpeech({ lang, voiceId, text: script });
    await writeFile(filePath, audio);

    manifest.files.push({
      lang,
      nodeId: summary.nodeId,
      title,
      voiceId,
      text: script,
      file: `assets/audio/${fileName}`,
      bytes: audio.byteLength
    });
  }
}

await writeFile(join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${manifest.files.length} audio files in ${outputDir}`);
