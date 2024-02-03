import parseArgs from "./services/greeting/greeting.helper.js";

export class App {
  constructor(option) {
    this.context = Object.create({});
    this.context.currentDir = option.cwd();
    this.context.userName = parseArgs(option.process) ?? "USERNAME";
    this.middleware = [];
    this.platform = option.platform;
  }

  use(fn) {
    this.middleware.push(fn);
    return this;
  }

  callback() {
    const fn = this.middleware;
    this.handleContext(this.context, fn);
  }

  handleContext(ctx, fn) {
    return fn.forEach((element) => {
      element(ctx);
    });
  }


  handleInput = (line) => {
    const input = line.trim().split(" ");
    if (!line.trim()) return;
    const [command, ...args] = input;
    this.context.command = command;
    this.context.path = args.join(" ").trim();
    this.callback();
    return { command, args }, this.context;
  };
}
