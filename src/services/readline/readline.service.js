import readline from "readline";
import { finalService, greetingService, setCurrentDir } from "../index.js";

export default (process, { handleInput, context }) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (line) => {
    const command = await handleInput(line);
    if (command === ".exit") rl.close();
  })
    .on("SIGINT", () => rl.close())
    .on("close", () => {
      finalService(process);
      process.exit();
    });
  greetingService(process);
  setCurrentDir(context);
  rl.prompt();
};
