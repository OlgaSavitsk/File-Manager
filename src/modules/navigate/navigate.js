import { readdir, stat } from "fs/promises";
import path from "path";
import { chdir } from "process";
import { ERROR_MESSAGE } from "../../constants/index.js";

async function cd(ctx) {
  const pathToDir = path.resolve(ctx.currentDir, ctx.path);
  try {
    if ((await stat(pathToDir)).isDirectory()) {
      chdir(pathToDir);
      return (ctx.currentDir = pathToDir);
    }
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

async function up(ctx) {
  ctx.path = "..";
  return cd(ctx);
}

async function ls(ctx) {
  try {
    const folderList = await readdir(ctx.currentDir, { withFileTypes: true });
    const outputList = folderList
      .sort((a, b) => {
        return a.isFile() - b.isFile();
      })
      .filter(dir => !dir.isSymbolicLink())
      .map((file) => ({
        Name: file.name,
        Type: file.isDirectory() ? "directory" : "file",
      }))
    console.table(outputList);
  } catch {
    console.error(ERROR_MESSAGE);
  }
}

export default (baseControl) => {
  baseControl.use("cd", cd);
  baseControl.use("ls", ls);
  baseControl.use("up", up);
};
