import { modulesRoutes } from "../modules/index.js";

const definedRoutes = (app) => {
  app.use(modulesRoutes);
};

export default definedRoutes;
