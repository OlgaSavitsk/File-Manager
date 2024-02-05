import { readlineService } from "./services/index.js";
import { App } from "./app.js";
import routes from "./routes/index.js";
import { homedir } from "os";

const init = () => {
  const app = new App({ homedir });
  routes(app);
  return app;
};

const app = init();

(() => {
  readlineService(process, app);
  app.callback();
})();

export default app;
