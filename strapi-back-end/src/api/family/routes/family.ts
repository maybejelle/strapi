/**
 * family router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter("api::family.family", {
  config: {
    create: {
      middlewares: [],
    },
    update: {
      middlewares: ["global::familyMiddleware"],
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
