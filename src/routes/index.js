// import errorHandler from './middleware/errorHandler.js'
import { setCurrentDir, greetingService } from "../services/index.js";
import navigateRoutes from "../resource/navigate/navigateRoutes.js";
import fsRoutes from "../resource/fs/fsRoutes.js";

const definedRoutes = (app) => {
  app.use(greetingService);
  app.use(navigateRoutes);
  app.use(fsRoutes);
  app.use(setCurrentDir);
};

export default definedRoutes;
