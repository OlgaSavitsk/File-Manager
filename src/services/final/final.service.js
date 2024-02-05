import { EOL } from "os";
import parseArgs from "../greeting/greeting.helper.js";

const finalService = (process) => {
  const userName = parseArgs(process);
  console.log(`${EOL}Thank you for using File Manager, ${userName}, goodbye!`);
};

export default finalService;
