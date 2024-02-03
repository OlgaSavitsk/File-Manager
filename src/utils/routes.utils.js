import { BaseControlService } from "../services/rout-control/rout-control.service.js";

const getRoutes = (routesFunctions, ctx) => {
  const base = new BaseControlService(ctx);
  return routesFunctions.forEach((func) => {
    func(base);
  });
};

export default getRoutes;
