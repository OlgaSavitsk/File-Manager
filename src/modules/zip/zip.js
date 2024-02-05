import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { stat } from "fs/promises";
import { pipeline } from "stream/promises";
import path from "path";
import { ERROR_MESSAGE } from "../../constants/index.js";

async function compress(ctx) {
  const [sourcePathFile, targetPathFile] = ctx.path.trim().split(" ");
  const sourceFilePath = path.resolve(ctx.currentDir, sourcePathFile);
  const destDirPath = path.resolve(ctx.currentDir, targetPathFile);
  try {
    if (!(await stat(sourceFilePath)).isFile()) console.error(ERROR_MESSAGE);
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(destDirPath, { flags: "wx" });
    const brotliStream = createBrotliCompress();
    await pipeline(readableStream, brotliStream, writableStream);
  } catch {
    console.error(ERROR_MESSAGE);
  }
}
async function decompress(ctx) {
  const [sourcePathFile, targetPathFile] = ctx.path.trim().split(" ");
  const sourceFilePath = path.resolve(ctx.currentDir, sourcePathFile);
  const destDirPath = path.resolve(ctx.currentDir, targetPathFile);
  try {
    if (!(await stat(sourceFilePath)).isFile()) console.error(ERROR_MESSAGE);
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(destDirPath, { flags: "wx" });
    const brotliStream = createBrotliDecompress();
    await pipeline(readableStream, brotliStream, writableStream);
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

export default (baseControl) => {
  baseControl.use("compress", compress);
  baseControl.use("decompress", decompress);
};
