import { EOL } from "os";

const setCurrentDir = (ctx) => {
  console.log(`${EOL}You are currently in ${ctx.currentDir}`);
};

export default setCurrentDir;
