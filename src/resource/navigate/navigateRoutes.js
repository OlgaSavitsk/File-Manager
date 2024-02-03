import getRoutes from "../../utils/routes.utils.js";
import navigateFn from "./navigate.js";

const navigateRoutes = (ctx) => {
  getRoutes([navigateFn], ctx);
};

export default navigateRoutes;
