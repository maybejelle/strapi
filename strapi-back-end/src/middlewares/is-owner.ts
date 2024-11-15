"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const entryId = ctx.params.id;
    const user = ctx.state.user; 
    const userId = user?.id;

    if (!userId) return ctx.unauthorized(`You can't access this entry`);

    const apiName = ctx.state.route.info.apiName;
    const appUid = generateUID(apiName);

    if (entryId) {
      const location = await getLocation(strapi, appUid, entryId);
      if (location.family !== null) {
        const family = await getFamily(strapi, location.family.documentId);
        if (!isAuthorizedFamilyMember(family, userId, ctx)) return;
      } else if (!isAuthorizedUser(location.user, userId, ctx)){
         return;
      }
    } else {
      addFiltersToQuery(ctx, userId);
    }

    await next();
  };

  function generateUID(apiName) {
    const apiUid = `api::${apiName}.${apiName}`;
    return apiUid;
  }

  async function getLocation(strapi, appUid, entryId) {
    return await strapi.query(appUid).findOne({
      select: ["documentId"],
      where: { documentId: entryId },
      populate: { family: { owner: true, members: true }, user: true },
    });
  }

  async function getFamily(strapi, documentId) {
    return await strapi.query("api::family.family").findOne({
      where: { documentId },
      populate: { owner: true, members: true },
    });
  }

  function isAuthorizedFamilyMember(family, userId, ctx) {
    const isOwner = family.owner.id === userId;
    const isMember = family.members.some((member) => member.id === userId);
    if (!isOwner && !isMember) {
      ctx.unauthorized(`You can't access this entry`);
      return false;
    }
    if (!isOwner && ctx.request.method !== "GET") {
      ctx.unauthorized(`You can't access this entry`);
      return false;
    }
    return true;
  }

  function isAuthorizedUser(user, userId, ctx) {
    const isOwner = user.id === userId;
    if (!isOwner) {
      ctx.unauthorized(`You can't access this entry`);
      return false;
    }
    return true;
  }

  function addFiltersToQuery(ctx, userId) {
    ctx.query = {
      ...ctx.query,
      filters: {
        ...ctx.query.filters,
        $or: [
          { family: { owner: userId } },
          { family: { members: userId } },
          { user: userId },
        ],
      },
    };
  }
};
