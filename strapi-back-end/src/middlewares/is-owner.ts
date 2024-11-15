"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const entryId = ctx.params.id;
    const user = ctx.state.user; 
    const userId = user?.id;

    if (!userId) return ctx.unauthorized(`You can't access this entry`);

    const apiName = ctx.state.route.info.apiName;

    function generateUID(apiName) {
      const apiUid = `api::${apiName}.${apiName}`;
      return apiUid;
    }

    const appUid = generateUID(apiName);

  
    if (entryId) {
      const location = await strapi.query(appUid).findOne({
        select : ["documentId"],
        where : {documentId : entryId},
        populate: { family: { owner: true, members: true }, user: true },

      });

      if(location.family !== null){
       const family = await strapi.query("api::family.family").findOne({
        where: { documentId: location.family.documentId },
        populate: { owner: true, members: true },
      });

      const isOwner = family.owner.id === userId;
      const isMember = family.members.some((member) => member.id === userId);
      if (!isOwner && !isMember)
        return ctx.unauthorized(`You can't access this entry`); 
      if(!isOwner && ctx.request.method !== "GET")
        return ctx.unauthorized(`You can't access this entry`);
      }else{
        const isOwner = location.user.id === userId;
        if(!isOwner)
        return ctx.unauthorized(`You can't access this entry`);
      }
  
    }



    if (!entryId) {
      ctx.query = {
        ...ctx.query,
        filters: {
          ...ctx.query.filters,
          $or: [
            { family: { owner: userId } },
            { family: { members: userId }},
            {user : userId}
          ],
        
        },
      };
    }

    await next();
  };
};
