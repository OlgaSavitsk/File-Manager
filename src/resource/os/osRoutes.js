import getRoutes from "../../utils/routes.utils.js";
import osFn from "./os.js";

const osRoutes = (ctx) => {
  getRoutes([osFn], ctx);
};

export default osRoutes;