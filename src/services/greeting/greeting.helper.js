const parseArgs = (process) => {
  const args = process.argv.slice(2);
  if (args.length === 0) return "USER";
  const outputString = args
    .map((arg) => arg.split("=").filter((arg) => !arg.startsWith("--")))
    .join("");
  return outputString;
};

export default parseArgs;
