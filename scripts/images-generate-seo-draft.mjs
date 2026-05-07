#!/usr/bin/env node

import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = fileURLToPath(new URL("..", import.meta.url));
const apartmentArg = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--apartment="))
  ?.slice("--apartment=".length);
const generatedInputPath = path.join(
  workspaceRoot,
  "src",
  "data",
  "images",
  "accommodation-images.generated.json",
);
const outputPath = path.join(
  workspaceRoot,
  "src",
  "data",
  "images",
  "accommodation-images.seo-test.json",
);

const openAiApiKey = process.env.OPENAI_API_KEY || (await readEnvValue("OPENAI_API_KEY"));
const model = process.env.OPENAI_SEO_MODEL || "gpt-4.1-mini";
const targetImageIds = [];
const apartmentDisplayNames = {
  d1: "Dandelion D1",
  d2: "Dandelion D2",
  koveskal: "Dandelion KĂ¶veskĂˇl",
  fugehaz: "FĂĽgehĂˇz",
  szololiget: "Szololiget Vendeghaz",
  zsalya: "Zsalya Vendeghaz",
  royal_homes: "Dandelion Royal Homes",
};
const requiredDraftKeys = ["altHu", "titleHu", "captionHu", "altEn", "titleEn", "captionEn"];
const forbiddenPhrasePatterns = [
  /pergola/i,
  /veranda/i,
  /tornĂˇc/i,
  /pavilion/i,
  /kĂ©rgekkel Ă©s levelekkel/i,
  /bark and leaves/i,
  /barbecue/i,
  /grillsĂĽtĹ‘/i,
  /fire pit/i,
  /bearing fruit/i,
  /fĂĽgĂ©t Ă©rlelĹ‘/i,
  /gyĂĽmĂ¶lcs/i,
  /gyĂĽmĂ¶lcsĂ¶kkel/i,
  /Ă©rett/i,
  /levelekkel/i,
  /zĂ¶ld levelekkel/i,
  /fruit/i,
  /fruits/i,
  /bearing/i,
  /leaves/i,
  /green leaves/i,
  /talĂˇlhatĂł/i,
  /tal\u00E1lhat\u00F3/i,
  /tal\u00E1lhat\u00F3k/i,
  /lĂˇthatĂłk/i,
  /lĂˇthatĂł/i,
  /l\u00E1that\u00F3/i,
  /l\u00E1that\u00F3k/i,
  /egyszerĹ± berendezĂ©ssel/i,
  /egyszerĹ± elrendezĂ©ssel/i,
  /visible/i,
  /is visible/i,
  /are visible/i,
  /simple layout/i,
  /simple arrangement/i,
  /balaton/i,
  /lake view/i,
  /\bview\b/i,
  /pool/i,
  /mountain/i,
  /hills?/i,
  /kilĂˇtĂˇs\w*/i,
  /medenc\w*/i,
  /hegy\w*/i,
  /domb\w*/i,
];
const forbiddenSeoClaimPattern =
  /(Balaton|lake view|pool|mountain|hills?|kilĂˇtĂˇs\w*|medenc\w*|hegy\w*|domb\w*)/i;

if (!openAiApiKey) {
  console.error("STOP: missing required environment variable: OPENAI_API_KEY");
  console.error("Set OPENAI_API_KEY to an OpenAI API key with vision-capable model access.");
  process.exit(1);
}

const generatedRegistry = JSON.parse(await readFile(generatedInputPath, "utf8"));
const inputPath = (await fileExists(outputPath)) ? outputPath : generatedInputPath;
const registry = JSON.parse(await readFile(inputPath, "utf8"));
const runtimeRegistry =
  apartmentArg && generatedRegistry[apartmentArg]
    ? {
        ...registry,
        [apartmentArg]: registry[apartmentArg] ?? generatedRegistry[apartmentArg],
      }
    : registry;
const processedImages = [];
const bannedHits = [];
let hardFallbackCount = 0;
const resolvedTargetImageIds =
  targetImageIds.length > 0
    ? targetImageIds
    : Object.values(runtimeRegistry)
        .flatMap((apartment) => apartment?.gallery || [])
        .map((image) => image?.id)
        .filter(Boolean);
const filteredTargetImageIds = apartmentArg
  ? resolvedTargetImageIds.filter((imageId) => imageId.split("-")[0] === apartmentArg)
  : resolvedTargetImageIds;

for (const imageId of filteredTargetImageIds) {
  const apartmentKey = imageId.split("-")[0];
  const apartment = runtimeRegistry[apartmentKey];
  const image = apartment?.gallery?.find((entry) => entry?.id === imageId);

  if (!apartment || !image) {
    console.error(`STOP: missing test image for id: ${imageId}`);
    process.exit(1);
  }

  if (image.seoDraft?.approved === true) {
    continue;
  }

  const imagePath = resolvePublicImagePath(image.src);
  const imageDataUrl = await readImageAsDataUrl(imagePath);
  const seoResult = await generateSeoDraft({ apartmentKey, image, imageDataUrl });
  const seoDraft = seoResult.draft;
  const hardGuardForbiddenHits = collectForbiddenPhraseHits(seoDraft);

  image.seoDraft = {
    approved: false,
    ...seoDraft,
  };

  const imageBannedHits = collectBannedHits(image.seoDraft);
  if (imageBannedHits.length > 0) {
    bannedHits.push({
      id: image.id,
      hits: imageBannedHits,
    });
  }

  processedImages.push({
    id: image.id,
    altHu: image.seoDraft.altHu,
    titleHu: image.seoDraft.titleHu,
    captionHu: image.seoDraft.captionHu,
    altEn: image.seoDraft.altEn,
    titleEn: image.seoDraft.titleEn,
    captionEn: image.seoDraft.captionEn,
    approved: image.seoDraft.approved,
    retryUsed: seoResult.retryUsed || hardGuardForbiddenHits.length > 0,
    forbiddenHits: hardGuardForbiddenHits.length > 0 ? hardGuardForbiddenHits : seoResult.forbiddenHits,
    hardFallbackUsed: seoResult.hardFallbackUsed === true,
  });

  if (seoResult.hardFallbackUsed === true) {
    hardFallbackCount += 1;
  }
}

await writeFile(outputPath, `${JSON.stringify(runtimeRegistry, null, 2)}\n`, "utf8");

console.log("Status: OK");
console.log(`LĂ©trehozott script: ${path.relative(workspaceRoot, fileURLToPath(import.meta.url))}`);
console.log(`LĂ©trehozott teszt JSON: ${path.relative(workspaceRoot, outputPath)}`);
console.log(`Feldolgozott kĂ©pek: ${processedImages.map((item) => item.id).join(", ")}`);
console.log(`retryCount: ${processedImages.filter((item) => item.retryUsed).length}`);
console.log(`hardFallbackCount: ${hardFallbackCount}`);
console.log(`retrySummary: ${JSON.stringify(processedImages.map((item) => ({ id: item.id, retryUsed: item.retryUsed, hardFallbackUsed: item.hardFallbackUsed, forbiddenHits: item.forbiddenHits })) )}`);
console.log(`approvedFalse: ${processedImages.every((item) => item.approved === false)}`);
console.log(`bannedHits: ${JSON.stringify(bannedHits)}`);
console.log("API kulcs kellett-e: igen, OPENAI_API_KEY");
console.log("Commit: nem");
console.log("Push: nem");

function resolvePublicImagePath(src) {
  if (typeof src !== "string" || !src.startsWith("/images/")) {
    throw new Error(`Unsupported image src: ${src}`);
  }

  return path.join(workspaceRoot, "public", src);
}

async function readImageAsDataUrl(imagePath) {
  const extension = path.extname(imagePath).toLowerCase();
  const mimeType =
    {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
    }[extension] || "application/octet-stream";
  const imageBuffer = await readFile(imagePath);

  return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
}

async function generateSeoDraft({ apartmentKey, image, imageDataUrl }) {
  const initialDraft = await requestSeoDraft({
    prompt: buildPrompt({ apartmentKey, image }),
    image,
    imageDataUrl,
  });
  const initialForbiddenHits = collectForbiddenPhraseHits(initialDraft);

  if (initialForbiddenHits.length === 0) {
    return {
      draft: initialDraft,
      retryUsed: false,
      hardFallbackUsed: false,
      forbiddenHits: [],
    };
  }

  const retryDraft = await requestSeoDraft({
    prompt: buildRetryPrompt({ apartmentKey, image, forbiddenHits: initialForbiddenHits }),
    image,
    imageDataUrl,
  });
  const retryForbiddenHits = collectForbiddenPhraseHits(retryDraft);

  if (retryForbiddenHits.length > 0) {
    const fallbackDraft = applyHardFallbackDraft(retryDraft, retryForbiddenHits, apartmentKey);
    const fallbackForbiddenHits = collectForbiddenPhraseHits(fallbackDraft);
    return {
      draft: fallbackDraft,
      retryUsed: true,
      hardFallbackUsed: true,
      forbiddenHits: fallbackForbiddenHits,
    };
  }

  return {
    draft: retryDraft,
    retryUsed: true,
    hardFallbackUsed: false,
    forbiddenHits: retryForbiddenHits,
  };
}

async function requestSeoDraft({ prompt, image, imageDataUrl }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt,
            },
            {
              type: "input_image",
              image_url: imageDataUrl,
              detail: "high",
            },
          ],
        },
      ],
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.error?.message || `${response.status} ${response.statusText}`;
    console.error(`STOP: OpenAI vision request failed for ${image.id}.`);
    console.error(`Model: ${model}`);
    console.error(`Reason: ${message}`);
    console.error("Required environment variable: OPENAI_API_KEY");
    process.exit(1);
  }

  const rawText = extractResponseText(payload);
  const parsed = parseJsonObject(rawText, image.id);
  validateSeoDraft(parsed, image.id);

  return parsed;
}

function buildPrompt({ apartmentKey, image }) {
  const apartmentName = apartmentDisplayNames[apartmentKey] || apartmentKey;

  return `
You are preparing a TEST SEO draft for one accommodation image.

Return ONLY a valid JSON object with exactly these string keys:
altHu, titleHu, captionHu, altEn, titleEn, captionEn

Image context:
- apartmentKey: ${apartmentKey}
- accommodation name: ${apartmentName}
- image id: ${image.id}
- image src: ${image.src}

Rules:
- Write only what is visible in the image.
- You may use the accommodation name naturally when it helps: ${apartmentName}.
- Do not write generic phrases like "kis hĂˇz" or "small house" when a more specific visible description is possible.
- Prefer simple, reliable visible elements: terrace, roof, windows, garden, table, chairs, balcony, plants, facade.
- Avoid obscure object names; if an object is uncertain, omit it.
- Do not identify uncertain objects too specifically.
- If an object is not 100% clear, use a more neutral label.
- Use softer wording like "kerti elem" or "kert rĂ©szlete" instead of "grillsĂĽtĹ‘", "barbecue", or "fire pit" when uncertain.
- Use "fĂĽgebokor" or "fig bush" instead of "fĂĽgĂ©t Ă©rlelĹ‘ bokor" or "bearing fruit" unless the fruit is clearly visible.
- Use "szĂ©k" or "chair" instead of "kĂ©nyelmes szĂ©k" or "comfortable chair" unless comfort is directly visible.
- Do not describe fruit as ripe, green, or similar unless that is unmistakably clear in the image.
- Do not use "close view", "view of", or similar wording in English alt or caption.
- Prefer plain subject wording over camera-perspective wording.
- Do not guess specific architectural structure names unless completely certain.
- Avoid these specific words unless they are unmistakably clear: "pergola", "veranda", "tornĂˇc", "pavilion".
- Prefer simpler wording like "fedett terasz", "terasz", "covered terrace", or "terrace".
- ALT must be short: about 12 to 16 words maximum.
- ALT should describe only the main subject.
- ALT must not list every small detail in the image.
- If an object is not completely certain, leave it out of ALT.
- Use common Hungarian words only; do not create unusual compound words.
- Do not mention material or color if it is uncertain.
- Do not count objects unless the count is visually certain; use plural wording instead.
- Start alt and title with the main subject of the image.
- For Hungarian altHu and titleHu, start with the accommodation name plus the main subject, or with the main subject itself using normal capitalization.
- Do not start alt or title with roof, wall, floor, column, sky, or background details when the main subject is a terrace, room, facade, garden, or guesthouse.
- Title should be a short, human image name, not a technical list.
- TITLE must be short: about 5 to 8 words maximum.
- TITLE must be a simple image name, not a list.
- Caption may be more detailed, but it should not sound overly promotional.
- Hungarian text must sound natural and idiomatic, with correct singular/plural forms.
- Hungarian caption must be a simple, natural sentence.
- Do not use these Hungarian words in captionHu: "rendelkezik", "talĂˇlhatĂł", "figyelhetĹ‘".
- Do not use these Hungarian phrases in captionHu: "lĂˇthatĂł kĂ¶zelrĹ‘l", "kĂ¶zelrĹ‘l lĂˇthatĂł".
- Prefer plain Hungarian phrasing like: "A teraszon szĂ©kek Ă©s egy asztal lĂˇthatĂł."
- For plants, keep wording general: "fĂĽgebokor", "bokor", "nĂ¶vĂ©ny".
- Do not use detailed botanical phrasing.
- Do not use wording like "kĂ©rgekkel Ă©s levelekkel".
- In Hungarian, after numbers use singular nouns, for example "nĂ©gy szĂ©kkel", never "nĂ©gy szĂ©kekkel".
- Never merge numbers and nouns in Hungarian, for example write "nĂ©gy szĂ©kkel", not "nĂ©gyszĂ©kkel".
- Avoid promotional phrases such as "vĂˇrja a vendĂ©geket", "tĂ¶kĂ©letes pihenĂ©s", or "ideĂˇlis vĂˇlasztĂˇs".
- Do not use "nappali" unless an indoor living room is the main subject.
- For outdoor terrace, facade, or garden images, do not name indoor rooms seen through doors or windows.
- Never use invented words such as "fĂĽgyevĹ‘" or "fĂĽgyeves"; use "fĂĽgebokor", "fĂĽgeĂˇg", or "fĂĽge" only if visible.
- English text must also sound natural, not translated word-for-word.
- English caption must be a natural descriptive sentence.
- Do not use these English phrases in captionEn: "features", "is equipped with".
- Do not use these English phrases in captionEn: "is shown close to", "shown close to".
- Prefer plain English phrasing like: "The terrace has yellow chairs and a table."
- Do not mention "hanging chair" unless it is unmistakably clear in the image.
- Do not mention "hintaszĂ©k" unless it is unmistakably clear in the image.
- Caption is critical: write it like a simple everyday sentence a guest might say.
- Caption must be a single sentence.
- Caption should mention only the main things, not every visible detail.
- altHu maximum length: about 120 characters.
- titleHu maximum length: about 60 characters.
- captionHu maximum length: about 160 characters.
- caption should feel human, but stay short and factual.
- For this test, do not mention Lake Balaton, Balaton, lake view, view, pool, mountain, hills, kilĂˇtĂˇs, kilĂˇtĂˇssal, medence, hegy, or domb.
- Do not invent amenities, room types, locations, moods, views, people, brands, or services.
- Do not name a time of day, season, or weather condition unless it is visually clear.
- Do not keyword-stuff.
- Do not force the accommodation name to the start of every sentence.
- Use the accommodation name only when it sounds natural.
- Keep every field natural, short, and useful for SEO.
- Hungarian and English versions are both required.
- alt text should describe the visible image plainly.
- title should be shorter than the caption.
- caption should be one concise sentence.
`.trim();
}

function buildRetryPrompt({ apartmentKey, image, forbiddenHits }) {
  const apartmentName = apartmentDisplayNames[apartmentKey] || apartmentKey;
  const forbiddenList = forbiddenHits.map((hit) => `"${hit.match}"`).join(", ");

  return `
You are revising a TEST SEO draft for one accommodation image.

Return ONLY a valid JSON object with exactly these string keys:
altHu, titleHu, captionHu, altEn, titleEn, captionEn

Image context:
- apartmentKey: ${apartmentKey}
- accommodation name: ${apartmentName}
- image id: ${image.id}
- image src: ${image.src}

This is a correction pass.

Do not use any of these forbidden phrases:
${forbiddenList}

Use simpler, more neutral wording.
Do not guess uncertain objects.
If something is not fully clear, leave it out.
Keep ALT short and focused on the main subject.
Keep TITLE short and simple.
Keep CAPTION to one natural everyday sentence with only the main things.
Caption should sound like a natural guest-facing sentence.
Avoid inventory-style wording.
Do not use "visible", "lĂˇthatĂł", "talĂˇlhatĂł", or similar camera/report language.
Prefer simple human wording:
- HU: "A fĂĽrdĹ‘szoba vilĂˇgos, zuhanyzĂłval Ă©s mosdĂłval."
- EN: "The bathroom is bright, with a shower and sink."
Do not mention balcony, terrace structures, plants, or garden objects too specifically if uncertain.
Do not use camera-like wording or over-detailed plant descriptions.
Do not describe plant details like fruits, leaves, ripeness.
Use simple terms like "fig bush" or "plant" only.
Do not mention Lake Balaton, lake view, pool, mountain, hills, kilĂˇtĂˇs, medence, hegy, or domb.
Hungarian and English versions are both required.
`.trim();
}

function extractResponseText(payload) {
  if (typeof payload?.output_text === "string") {
    return payload.output_text;
  }

  const chunks = [];
  for (const outputItem of payload?.output || []) {
    for (const contentItem of outputItem?.content || []) {
      if (typeof contentItem?.text === "string") {
        chunks.push(contentItem.text);
      }
    }
  }

  return chunks.join("\n").trim();
}

function parseJsonObject(rawText, imageId) {
  const normalized = rawText
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(normalized);
  } catch {
    console.error(`STOP: OpenAI response for ${imageId} was not valid JSON.`);
    console.error(normalized);
    process.exit(1);
  }
}

function validateSeoDraft(draft, imageId) {
  const draftKeys = Object.keys(draft).sort();
  const expectedKeys = [...requiredDraftKeys].sort();
  const hasExactKeys =
    draftKeys.length === expectedKeys.length &&
    draftKeys.every((key, index) => key === expectedKeys[index]);

  if (!hasExactKeys) {
    console.error(`STOP: OpenAI response for ${imageId} did not match the required seoDraft keys.`);
    console.error(`Expected keys: ${expectedKeys.join(", ")}`);
    console.error(`Received keys: ${draftKeys.join(", ")}`);
    process.exit(1);
  }

  for (const key of requiredDraftKeys) {
    if (typeof draft[key] !== "string" || draft[key].trim() === "") {
      console.error(`STOP: OpenAI response for ${imageId} has an empty or invalid ${key}.`);
      process.exit(1);
    }

    draft[key] = draft[key].trim();

  }

  if (draft.altHu.length > 130 || draft.titleHu.length > 70 || draft.captionHu.length > 180) {
    console.error(`STOP: OpenAI response for ${imageId} exceeded the Hungarian length guidance.`);
    console.error(
      `altHu: ${draft.altHu.length}, titleHu: ${draft.titleHu.length}, captionHu: ${draft.captionHu.length}`,
    );
    process.exit(1);
  }
}

function collectBannedHits(draft) {
  const hits = [];
  for (const key of requiredDraftKeys) {
    const value = draft[key] || "";
    if (forbiddenSeoClaimPattern.test(value)) {
      hits.push({ key, value });
    }
  }
  return hits;
}

function collectForbiddenPhraseHits(draft) {
  const hits = [];
  const plantWords = [
    "fĂĽgebokor",
    "bokor",
    "nĂ¶vĂ©ny",
    "fig bush",
    "bush",
    "plant",
  ];
  const plantDetailWords = [
    "gyĂĽmĂ¶lcs",
    "gyĂĽmĂ¶lcsĂ¶kkel",
    "Ă©rett",
    "levelekkel",
    "zĂ¶ld levelekkel",
    "fruit",
    "fruits",
    "bearing",
    "leaves",
    "green leaves",
  ];

  for (const key of requiredDraftKeys) {
    const value = draft[key] || "";
    for (const pattern of forbiddenPhrasePatterns) {
      const match = value.match(pattern);
      if (match) {
        hits.push({
          key,
          match: match[0],
          value,
        });
      }
    }

    const normalized = value.toLowerCase();
    const hasPlantWord = plantWords.some((word) => normalized.includes(word));
    const hasPlantDetail = plantDetailWords.some((word) => normalized.includes(word));
    if (hasPlantWord && hasPlantDetail) {
      hits.push({
        key,
        match: "plant_detailing",
        value,
      });
    }
  }
  return hits;
}

function applyHardFallbackDraft(draft, forbiddenHits, apartmentKey) {
  const nextDraft = { ...draft };
  const fallbackHuAltTitle = `${apartmentKey} szallas reszlete`;
  const fallbackEnAltTitle = `${apartmentKey} accommodation detail`;
  const fallbackHuCaption = "A kep a szallas egyik reszletet mutatja.";
  const fallbackEnCaption = "The image shows one detail of the accommodation.";

  for (const hit of forbiddenHits) {
    if (hit.key === "altHu" || hit.key === "titleHu") {
      nextDraft[hit.key] = fallbackHuAltTitle;
    } else if (hit.key === "altEn" || hit.key === "titleEn") {
      nextDraft[hit.key] = fallbackEnAltTitle;
    } else if (hit.key === "captionHu") {
      nextDraft[hit.key] = fallbackHuCaption;
    } else if (hit.key === "captionEn") {
      nextDraft[hit.key] = fallbackEnCaption;
    }
  }

  return nextDraft;
}

async function readEnvValue(name) {
  const envPath = path.join(workspaceRoot, ".env");
  if (!(await fileExists(envPath))) {
    return "";
  }

  const content = await readFile(envPath, "utf8");
  const pattern = new RegExp(`^${name}\\s*=\\s*(.*)$`, "m");
  const match = content.match(pattern);
  return match ? match[1].trim() : "";
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}


