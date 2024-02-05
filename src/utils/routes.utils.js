import { RouteControlService } from "../services/route-control/route-control.service.js";

const getRoutes = (routesFunctions, ctx) => {
  const base = new RouteControlService(ctx);
  routesFunctions.forEach((func) => {
    func(base);
  });
  return base.callback();
};

export default getRoutes;
