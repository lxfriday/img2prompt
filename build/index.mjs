// src/process.ts
import exiftool from "dist-exiftool";
import util from "util";
import { execFile } from "child_process";

// src/util.ts
function safeGet(regex, target) {
  try {
    return regex.exec(target)[1].trim();
  } catch {
    return "";
  }
}
function safeGetPrompt(target) {
  try {
    const idxes = [
      target.indexOf("negative prompt:"),
      target.indexOf("negativeprompt:"),
      target.indexOf("sampler:"),
      target.indexOf("cfg scale:"),
      target.indexOf("seed:"),
      target.indexOf("size:"),
      target.indexOf("model hash:"),
      target.indexOf("model:"),
      target.indexOf("steps:")
    ].filter((idx) => idx > -1);
    return target.slice(0, Math.min(...idxes, target.length)).trim();
  } catch {
    return "";
  }
}
function safeGetNegativePrompt(target) {
  try {
    const negIdxes = [
      target.indexOf("negative prompt:"),
      target.indexOf("negativeprompt:")
    ].filter((idx2) => idx2 > -1);
    if (negIdxes.length === 0)
      return "";
    const idx = Math.min(...negIdxes);
    target = target.slice(idx);
    const idxes = [
      target.indexOf("sampler:"),
      target.indexOf("cfg scale:"),
      target.indexOf("seed:"),
      target.indexOf("size:"),
      target.indexOf("model hash:"),
      target.indexOf("model:"),
      target.indexOf("steps:")
    ].filter((idx2) => idx2 > -1);
    return target.slice(0, Math.min(...idxes, target.length)).replace("negative prompt:", "").replace("negativeprompt:", "").trim();
  } catch {
    return "";
  }
}
function processPrompt(target) {
  target = target.toLowerCase().trim();
  let prompt = safeGetPrompt(target), negativePrompt = safeGetNegativePrompt(target), sampler = safeGet(/sampler:(.+?),/gi, target), cfgScale = safeGet(/cfg scale:(.+?),/gi, target), steps = safeGet(/steps:(.+?),/gi, target), seed = safeGet(/seed:(.+?),/gi, target), size = safeGet(/size:(.+?),/gi, target), modelHash = safeGet(/model hash:(.+?),/gi, target), model = safeGet(/model:(.+?),/gi, target) || safeGet(/model:(.+),?/gi, target);
  const modelInfo = {
    prompt,
    negativePrompt,
    sampler,
    cfgScale,
    seed,
    size,
    modelHash,
    model,
    steps
  };
  return modelInfo;
}

// src/process.ts
async function readImage(imgPath) {
  try {
    const { stdout } = await util.promisify(execFile)(exiftool, ["-j", imgPath]);
    return JSON.parse(stdout)[0].parameters || "";
  } catch (error) {
    return "";
  }
}
async function readImageV2(imgPath) {
  const rawInfo = await readImage(imgPath);
  const promptInfo = processPrompt(rawInfo);
  return promptInfo;
}
export {
  readImage,
  readImageV2
};
//# sourceMappingURL=index.mjs.map