/**
 * device router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter("api::device.device", {
  config: {
    create: {
      middlewares: ["global::deviceMiddleware"],
    },
    update: {
      middlewares: ["global::deviceMiddleware"],
    },
    delete: {
      middlewares: ["global::deviceMiddleware"],
    },
    find: {
      middlewares: ["global::deviceMiddleware"],
    },
    findOne: {
      middlewares: ["global::deviceMiddleware"],
    },
  },
});
