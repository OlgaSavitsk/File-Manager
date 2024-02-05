import getRoutes from "../utils/routes.utils.js";
import osFn from "./os/os.js";
import navigateFn from "./navigate/navigate.js";
import hashFn from "./hash/hash.js";
import fsFn from "./fs/fs.js";
import zipFn from "./zip/zip.js";

const modulesRoutes = (ctx) => {
  getRoutes([osFn, navigateFn, hashFn, fsFn, zipFn], ctx);
};

export default modulesRoutes;
