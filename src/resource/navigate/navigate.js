import { readdir } from "fs/promises";
import path from "path";
import { chdir } from "process";

async function cd(ctx) {
  const pathToDir = path.resolve(ctx.currentDir, ctx.path);
  chdir(pathToDir);
  return (ctx.currentDir = pathToDir);
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
      .map((file) => ({
        Name: file.name,
        Type: file.isDirectory() ? "directory" : "file",
      }));
    console.table(outputList);
  } catch {
    throw new Error("Operation failed");
  }
}

export default (baseControl) => {
  baseControl.init("cd", cd);
  baseControl.init("ls", ls);
  baseControl.init("up", up);
};

// try {
//   if ((await stat(pathToDir)).isDirectory()) {
//     await chdir(pathToDir);
//     return ctx.currentDir = pathToDir;
//   } else throw new Error("Operation failed");
// } catch(err) {
//   throw new Error(err);
// }
