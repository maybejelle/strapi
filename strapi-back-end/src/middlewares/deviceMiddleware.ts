import family from "../api/family/controllers/family";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Ensure the user is authenticated
    const loggedInUser = ctx.state.user;
    if (!loggedInUser) {
      ctx.unauthorized("You must be logged in to access this resource.");
      return;
    }

    if (ctx.request.method === "POST") {
      const userId = ctx.request.body.data.user;

      // Check if the userId matches the logged-in user's ID
      if (userId !== loggedInUser.documentId) {
        ctx.forbidden("You are not authorized to perform this action.");
        return;
      }

      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { documentId: userId },
          populate: { family_owner: true, families_member: true },
        });

      if (!user) {
        ctx.notFound("User not found.");
        return;
      }

      let familyId = "";
      // Check if the user is the owner of the family
      if (user.family_owner !== null) {
        familyId = user.family_owner.documentId;
      } else if (user.families_member.length > 0) {
        familyId = user.families_member[0].documentId;
      }

      
      ctx.request.body.data = {
        name: ctx.request.body.data.name,
        user: userId,
        location: ctx.request.body.data.location,
        device_type: ctx.request.body.data.device_type,
        device_id: ctx.request.body.data.device_id,
        metadata: ctx.request.body.data.metadata,
      };
      if (familyId !== "") {
        ctx.request.body.data.family = familyId;
      }
    }

    if (ctx.request.method === "PUT") {
      const device = await strapi.query("api::device.device").findOne({
        where: { documentId: ctx.request.params.id },
        populate: { user: true, location: true, family: true },
      });
      const family = await strapi.query("api::family.family").findOne({
        where: { documentId: device.family.documentId },
        populate: { owner: true, members: true },
      });

      if (!device) {
        ctx.notFound("Device not found.");
        return;
      }

      if(family){
        if (!isAuthorizedFamilyMember(family, loggedInUser.documentId, ctx)) {
          return ctx.unauthorized(
            `You are not authorized to perform this action.`
          );
        }
      }

      if (device.user.documentId !== loggedInUser.documentId && !family) {
        ctx.forbidden("You are not authorized to perform this action.");
        return;
      }

      ctx.request.body.data = {
        name: device.name,
        device_id: device.device_id,
        user: device.user.documentId,
        location: device.location.documentId,
        device_type: device.device_type,
        metadata: ctx.request.body.data.metadata,
      };
    }
    await next();
  };

  function isAuthorizedFamilyMember(family, userId, ctx) {
    const isOwner = family.owner.documentId === userId;
    const isMember = family.members.some((member) => member.documentId === userId);
    if (!isOwner && !isMember) {
      ctx.unauthorized(`You can't access this entry`);
      return false;
    }
    return true;
  }
};
