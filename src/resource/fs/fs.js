import { createReadStream, createWriteStream } from "fs";
import { writeFile, rename as renameFile, unlink } from "fs/promises";
import { pipeline } from "stream/promises";
import path from "path";

async function read(ctx) {
  try {
    const pathToDir = path.resolve(ctx.currentDir, ctx.path);
    const readableStream = createReadStream(pathToDir);
    await pipeline(readableStream, process.stdout);
  } catch {
    throw new Error("Operation failed");
  }
}

async function create(ctx) {
  const pathToFile = path.resolve(ctx.currentDir, ctx.path);
  try {
    await writeFile(pathToFile, "", { flag: "wx" });
  } catch (err) {
    throw new Error(err);
  }
}

async function rename(ctx) {
  const [sourceFile, newFile] = ctx.path.trim().split(" ");
  const sourceFilePath = path.resolve(ctx.currentDir, sourceFile);
  const pathToNewFile = path.resolve(ctx.currentDir, newFile);
  try {
    await renameFile(sourceFilePath, pathToNewFile);
  } catch (err) {
    throw new Error(err);
  }
}

async function copy(ctx) {
  const [sourceFile, newFile] = ctx.path.trim().split(" ");
  const sourceFilePath = path.resolve(ctx.currentDir, sourceFile);
  const destDirPath = path.resolve(ctx.currentDir, newFile);
  console.log(destDirPath)
  try {
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(path.resolve(destDirPath, sourceFile), { flags: "wx" });
    await pipeline(readableStream, writableStream);
  } catch (err){
    throw new Error(err);
  }
}

async function move(ctx) {
  try {
    await copy(ctx);
    await remove(ctx);
  } catch(err) {
    throw new Error(err);
  }
}

async function remove(ctx) {
  const [sourceFile, ] = ctx.path.trim().split(" ");
  const pathToFile = path.resolve(ctx.currentDir, sourceFile);
  try {
    await unlink(pathToFile);
  } catch(err) {
    throw new Error(err);
  }
}

export default (baseControl) => {
  baseControl.init("cat", read);
  baseControl.init("add", create);
  baseControl.init("rn", rename);
  baseControl.init("cp", copy);
  baseControl.init("mv", move);
  baseControl.init("rm", remove);
};
