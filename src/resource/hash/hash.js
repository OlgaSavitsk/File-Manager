import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";
import path from "path";

async function hash(ctx) {
  try {
    const pathToFile = path.resolve(ctx.currentDir, ctx.path);
    const readableStream = createReadStream(pathToFile);
    const hex = createHash("sha256");
    readableStream.on("data", (chunk) => hex.update(chunk));
    await pipeline(readableStream, hex.digest("hex"), process.stdout);
  } catch {
    throw new Error("Operation failed");
  }
}

export default (baseControl) => {
  baseControl.init("hash", hash);
};
