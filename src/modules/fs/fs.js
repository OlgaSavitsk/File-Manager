import { writeFile, rename as renameFile, unlink, stat } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import path, { dirname } from "path";

import { ERROR_MESSAGE } from "../../constants/index.js";

async function read(ctx) {
  const pathToDir = path.resolve(ctx.currentDir, ctx.path);
  try {
    const readableStream = createReadStream(pathToDir);
    await pipeline(readableStream, process.stdout, { end: false });
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

async function create(ctx) {
  const pathToFile = path.resolve(ctx.currentDir, ctx.path);
  try {
    await writeFile(pathToFile, "", { flag: "wx" });
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

async function rename(ctx) {
  const [sourceFile, newFile] = ctx.path.trim().split(" ");
  const sourceFilePath = path.resolve(ctx.currentDir, sourceFile);
  const targetFolderPath = dirname(sourceFilePath);
  const pathToNewFile = path.resolve(targetFolderPath, newFile);
  try {
    if ((await stat(sourceFilePath)).isFile()) {
      return await renameFile(sourceFilePath, pathToNewFile);
    }
    throw new Error(ERROR_MESSAGE);
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

async function copy(ctx) {
  const [sourceFile, destDir] = ctx.path.trim().split(" ");
  const sourceFilePath = path.resolve(ctx.currentDir, sourceFile);
  const targetFolderPath = path.resolve(ctx.currentDir, destDir);
  const targetFilePath = path.resolve(
    targetFolderPath,
    sourceFile.split("/").at(-1)
  );
  try {
    if (
      !(await stat(sourceFilePath)).isFile() &&
      (await stat(targetFilePath)).isFile()
    ) {
      console.error(ERROR_MESSAGE);
    }
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(targetFilePath, { flags: "wx" });
    await pipeline(readableStream, writableStream);
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

async function move(ctx) {
  try {
    await copy(ctx);
    await remove(ctx);
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

async function remove(ctx) {
  const [sourceFile] = ctx.path.trim().split(" ");
  const pathToFile = path.resolve(ctx.currentDir, sourceFile);
  try {
    await unlink(pathToFile);
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

export default (baseControl) => {
  baseControl.use("cat", read);
  baseControl.use("add", create);
  baseControl.use("rn", rename);
  baseControl.use("cp", copy);
  baseControl.use("mv", move);
  baseControl.use("rm", remove);
};
