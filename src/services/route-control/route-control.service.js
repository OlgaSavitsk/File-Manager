import { ERROR_MESSAGE, INVALID_INPUT_MESSAGE } from "../../constants/index.js";
import { setCurrentDir } from "../index.js";

export class RouteControlService {
  constructor(ctx) {
    this.ctx = ctx;
    this.middleware = new Map();
  }

  use(command, fn) {
    this.middleware.set(command, fn);
    return this;
  }

  callback() {
    const fn = this.middleware;
    this.init();
  }

  async init() {
    if (!this.ctx.command) return;
    const param = this.ctx.path.startsWith("--")
      ? this.ctx.path
      : this.ctx.command;
    const fn = this.middleware.get(param);
    try {
      if (fn) await fn(this.ctx);
      else console.error(INVALID_INPUT_MESSAGE);
    } catch (err) {
      console.error(ERROR_MESSAGE);
    } finally {
      setCurrentDir(this.ctx);
    }
  }
}
