import { EOL, arch, cpus, homedir, userInfo } from "os";

function os(ctx) {
  console.log(`CPU architecture: ${arch()}`);
}

function eol() {
  console.log(`EOL: ${JSON.stringify(EOL)}`);
}

function cpusInfo() {
  const numCPUs = cpus();
  const cpuList = numCPUs.map(({ model, speed }) => ({
    Model: model.trim(),
    ClockRate: `${speed / 1000} GHz`,
  }));
  console.table(cpuList);
}

function homeDir() {
  console.log(`Home directory: ${homedir()}`);
}

function usernameInfo() {
  console.log(`Current system user name: ${userInfo().username}`);
}

function architecture() {
  console.log(`CPU architecture: ${arch()}`);
}

export default (baseControl) => {
  baseControl.use("os", os);
  baseControl.use("--EOL", eol);
  baseControl.use("--cpus", cpusInfo);
  baseControl.use("--homedir", homeDir);
  baseControl.use("--username", usernameInfo);
  baseControl.use("--architecture", architecture);
};
