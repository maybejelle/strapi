module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Ensure the user is authenticated
    const loggedInUser = ctx.state.user;
    if (!loggedInUser) {
      ctx.unauthorized("You must be logged in to access this resource.");
      return;
    }

    if (ctx.request.method === "POST") {
      const ownerId = ctx.request.body.data.owner;
      if(ownerId !== loggedInUser.documentId){
        ctx.forbidden("You are not authorized to perform this action.");
        return;
      }

        const owner = await strapi
            .query("plugin::users-permissions.user")
            .findOne({
            where: { documentId: ownerId },
            populate: { locations: true },
            });

        if (!owner) {
            ctx.notFound("Owner not found.");
            return;
        }
        const locationIds = [];

        owner.locations.forEach((location) => {
            locationIds.push(location.documentId);
        });

        ctx.request.body.data = {
            name: ctx.request.body.data.name,
            owner: ownerId,
            locations: locationIds,
        };
    }
    await next();
  };
};
