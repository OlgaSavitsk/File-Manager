import { EOL, arch, cpus, homedir, userInfo } from "os";

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
  baseControl.init("--EOL", eol);
  baseControl.init("--cpus", cpusInfo);
  baseControl.init("--homedir", homeDir);
  baseControl.init("--username", usernameInfo);
  baseControl.init("--architecture", architecture);
};
