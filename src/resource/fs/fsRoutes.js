import getRoutes from "../../utils/routes.utils.js";
import fsFn from "./fs.js";

const fsRoutes = (ctx) => {
  getRoutes([fsFn], ctx);
};

export default fsRoutes;
