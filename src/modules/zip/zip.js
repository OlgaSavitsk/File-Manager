import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { stat } from "fs/promises";
import { pipeline } from "stream";
import path from "path";
import { ERROR_MESSAGE } from "../../constants/index.js";

async function compress(ctx) {
  const [sourcePathFile, targetPathFile] = ctx.path.trim().split(" ");
  const sourceFilePath = path.resolve(ctx.currentDir, sourcePathFile);
  const destDirPath = path.resolve(ctx.currentDir, targetPathFile);
  try {
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(destDirPath, { flags: "wx" });
    const brotliStream = createBrotliCompress();
    pipeline(readableStream, brotliStream, writableStream, (err) => {
      if (err) throw new Error(ERROR_MESSAGE);
    });
  } catch {
    console.error(ERROR_MESSAGE);
  }
}
async function decompress(ctx) {
  const [sourcePathFile, targetPathFile] = ctx.path.trim().split(" ");
  const sourceFilePath = path.resolve(ctx.currentDir, sourcePathFile);
  const destDirPath = path.resolve(ctx.currentDir, targetPathFile);
  try {
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(destDirPath, { flags: "wx" });
    const brotliStream = createBrotliDecompress();
    pipeline(readableStream, brotliStream, writableStream, (err) =>
      console.error(err)
    );
  } catch (err) {
    console.error(err);
  }
}

export default (baseControl) => {
  baseControl.use("compress", compress);
  baseControl.use("decompress", decompress);
};
