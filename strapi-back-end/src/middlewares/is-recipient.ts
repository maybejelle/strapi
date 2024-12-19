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
      
        const request = await getRequest(strapi, appUid, entryId);
        console.log(request);
        if (!isAuthorizedUser(request.recipient, userId, ctx)) return ctx.unauthorized(`You can't access this entry`);

    } else {
      addFiltersToQuery(ctx, userId);
    }

    await next();
  };

  function getRequest(strapi, appUid, entryId) {
    return strapi.query(appUid).findOne({
        select: ["documentId"],
        where: { documentId: entryId },
        populate: {recipient: true},
        });
    }

  function generateUID(apiName) {
    const apiUid = `api::${apiName}.${apiName}`;
    return apiUid;
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
        $or: [{ recipient: userId },
        ],
      },
    };
  }
};
