export class App {
  constructor(option) {
    this.context = Object.create({});
    this.context.currentDir = option.cwd();
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

  handleInput = async (line) => {
    const input = line.trim();
    if (!input) return;
    const [command, ...args] = input.split(" ");
    this.context.command = command;
    this.context.path = args.join(" ").trim();
    this.callback();
    return command;
  };
}
