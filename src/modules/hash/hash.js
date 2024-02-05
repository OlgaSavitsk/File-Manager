import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";
import path from "path";

import { ERROR_MESSAGE } from "../../constants/index.js";

async function hash(ctx) {
  try {
    const hex = createHash("sha256");
    const pathToFile = path.resolve(ctx.currentDir, ctx.path);
    const readableStream = createReadStream(pathToFile);
    await pipeline(readableStream, hex, {
      end: false,
    });
    console.log(hex.digest("hex"));
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

export default (baseControl) => {
  baseControl.use("hash", hash);
};
