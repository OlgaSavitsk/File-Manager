import getRoutes from "../../utils/routes.utils.js";
import hashFn from "./hash.js";

const hashRoutes = (ctx) => {
  getRoutes([hashFn], ctx);
};

export default hashRoutes;
