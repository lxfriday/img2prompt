// src/index.ts
import exiftool from "dist-exiftool";
import util from "util";
import { execFile } from "child_process";
async function readImage(imgPath) {
  try {
    const { stdout } = await util.promisify(execFile)(exiftool, ["-j", imgPath]);
    return JSON.parse(stdout)[0].parameters;
  } catch (error) {
    return "";
  }
}
export {
  readImage
};
//# sourceMappingURL=index.mjs.map