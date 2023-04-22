var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  readImage: () => readImage,
  readImageV2: () => readImageV2
});
module.exports = __toCommonJS(src_exports);

// src/process.ts
var import_dist_exiftool = __toESM(require("dist-exiftool"));
var import_util = __toESM(require("util"));
var import_child_process = require("child_process");

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
    const { stdout } = await import_util.default.promisify(import_child_process.execFile)(import_dist_exiftool.default, ["-j", imgPath]);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  readImage,
  readImageV2
});
//# sourceMappingURL=index.js.map