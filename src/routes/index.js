// import errorHandler from './middleware/errorHandler.js'
import { setCurrentDir, greetingService } from "../services/index.js";
import {navigateRoutes, fsRoutes, osRoutes} from "../resource/index.js";

const definedRoutes = (app) => {
  app.use(greetingService);
  app.use(navigateRoutes);
  app.use(fsRoutes);
  app.use(osRoutes);
  app.use(setCurrentDir);
};

export default definedRoutes;
