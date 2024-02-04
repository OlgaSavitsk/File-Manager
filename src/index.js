import { readlineService } from "./services/index.js";
import { App } from "./app.js";
import routes from "./routes/index.js";
import { homedir } from "os";
import { cwd } from "process";

const init = () => {
  const app = new App({ cwd });
  routes(app);
  return app;
};

const app = init();

(() => {
  readlineService(process, app);
  app.callback();
})();

export default app;
