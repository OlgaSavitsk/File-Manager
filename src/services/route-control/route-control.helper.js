const getParam = (ctx) => {
  return ctx.path.startsWith("--") ? ctx.path : ctx.command;
};

export default getParam;
