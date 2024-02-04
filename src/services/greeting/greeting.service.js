import parseArgs from "./greeting.helper.js";

const greetingService = (process) => {
  const userName = parseArgs(process);
  console.log(`Welcome to the File Manager, ${userName}!`);
};

export default greetingService;
