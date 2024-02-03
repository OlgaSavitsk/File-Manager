export class BaseControlService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async init(command, fn) {
    if (!this.ctx.command) return;
    try {
      if (this.ctx.command === command || this.ctx.path === command) {
        await fn(this.ctx);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async validate() {
    const [fn] = this.route;
    try {
      if (fn) await fn(this.ctx);
      else throw new Error("invalid input");
    } catch (err) {
      console.log(err);
    }
  }
}
