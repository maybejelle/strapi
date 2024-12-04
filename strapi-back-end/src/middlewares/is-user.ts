module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Ensure the user is authenticated
    const loggedInUser = ctx.state.user;
    if (!loggedInUser) {
      ctx.unauthorized("You must be logged in to access this resource.");
      return;
    }

    
   

    if (ctx.request.method === "POST") { 
      const userId = ctx.request.body.data.claimed_by;

    // Check if the userId matches the logged-in user's ID
    if (userId !== loggedInUser.documentId) {
      ctx.forbidden("You are not authorized to perform this action.");
      return;
    }
      ctx.request.body.data = {
        name: ctx.request.body.data.name,
        device_id: ctx.request.body.data.device_id,
        user: userId,
        location: ctx.request.body.data.location,
        device_type: ctx.request.body.data.device_type,
      };
    }
    // if put request update metadata from device
    if (ctx.request.method === "PUT") {
      const device = await strapi.query("api::device.device").findOne({
        where: { documentId: ctx.request.params.id },
        populate: {user : true, location: true},
      });
      if (!device) {
        ctx.notFound("Device not found.");
        return;
      }
      if(device.user.documentId !== loggedInUser.documentId){
        ctx.forbidden("You are not authorized to perform this action.");
        return;
      }
      ctx.request.body.data = {
        name: device.name,
        device_id: device.device_id,
        user: device.user.documentId,
        location: device.location.documentId,
        device_type: device.device_type,
        metadata: { temperature: ctx.request.body.data.temperature },
      };
    }

    await next();
  };
};
