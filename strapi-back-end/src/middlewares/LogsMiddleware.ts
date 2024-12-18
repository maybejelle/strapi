"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const userId = user?.id;

    if (!userId) return ctx.unauthorized(`You can't access this entry`);
    addFiltersToQuery(ctx, userId);

    await next();
  };

  
   function addFiltersToQuery(ctx, userId) {
     ctx.query = {
       ...ctx.query,
       filters: {
         ...ctx.query.filters,
         $or: [
           { family: { owner: userId } },
           { family: { members: userId } },
         ],
       },
     };
   }
};
