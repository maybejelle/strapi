module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const loggedInUser = ctx.state.user;
    if (!loggedInUser) {
      return ctx.unauthorized("You must be logged in to access this resource.");
    }

    const { method, body, params } = ctx.request;

    if (method === "POST") {
      await handlePostRequest(ctx, loggedInUser, body, strapi);
    } else if (method === "PUT") {
      await handlePutRequest(ctx, loggedInUser, params, body, strapi);
    }

    await next();
  };
};

async function handlePostRequest(ctx, loggedInUser, body, strapi) {
  const userId = body.data.user;

  if (userId !== loggedInUser.documentId) {
    return ctx.forbidden("You are not authorized to perform this action.");
  }

  const user = await strapi.query("plugin::users-permissions.user").findOne({
    where: { documentId: userId },
    populate: { family_owner: true, families_member: true },
  });

  if (!user) {
    return ctx.notFound("User not found.");
  }

  const familyId = getFamilyId(user);
  body.data = sanitizePostBody(body.data, userId, familyId);
}

async function handlePutRequest(ctx, loggedInUser, params, body, strapi) {
  const device = await strapi.query("api::device.device").findOne({
    where: { documentId: params.id },
    populate: { user: true, location: true, family: true },
  });

  if (!device) {
    return ctx.notFound("Device not found.");
  }

  if (device.family) {
    const family = await strapi.query("api::family.family").findOne({
      where: { documentId: device.family.documentId },
      populate: { owner: true, members: true },
    });

    if (!isAuthorizedFamilyMember(family, loggedInUser.documentId)) {
      return ctx.unauthorized("You are not authorized to perform this action.");
    }
  } else if (device.user.documentId !== loggedInUser.documentId) {
    return ctx.forbidden("You are not authorized to perform this action.");
  }

  body.data = sanitizePutBody(device, body.data);
}

function getFamilyId(user) {
  if (user.family_owner) {
    return user.family_owner.documentId;
  }
  if (user.families_member.length > 0) {
    return user.families_member[0].documentId;
  }
  return "";
}

function sanitizePostBody(data, userId, familyId) {
   const sanitized: {
     name: any;
     user: any;
     location: any;
     device_type: any;
     device_id: any;
     metadata: any;
     family?: any;
   } = {
     name: data.name,
     user: userId,
     location: data.location,
     device_type: data.device_type,
     device_id: data.device_id,
     metadata: data.metadata,
   };
  if (familyId) {
    sanitized.family = familyId;
  }
  return sanitized;
}

function sanitizePutBody(device, data) {
  return {
    name: device.name,
    device_id: device.device_id,
    user: device.user.documentId,
    location: device.location.documentId,
    device_type: device.device_type,
    metadata: data.metadata,
  };
}

function isAuthorizedFamilyMember(family, userId) {
  const isOwner = family.owner.documentId === userId;
  const isMember = family.members.some(
    (member) => member.documentId === userId
  );
  return isOwner || isMember;
}
