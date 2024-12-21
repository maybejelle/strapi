/**
 * family router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter("api::family.family", {
  config: {
    create: {
      middlewares: ["global::familyMiddleware"],
    },
    update: {
      middlewares: [],
    },
    delete: {
      middlewares: [],
    },
    find: {
      middlewares: [],
    },
    findOne: {
      middlewares: [],
    },
  },
});
