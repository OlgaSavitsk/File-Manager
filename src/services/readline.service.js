import readline from "readline";

export default (process, handleInput) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    const { command } = handleInput(line);
    if (command === ".exit") rl.close();
  })
    .on("SIGINT", () => rl.close())
    .on("close", () => {
      console.log("Thank you for using File Manager, Username, goodbye!");
      process.exit();
    });
};
