/**
 * device router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter("api::device.device", {
  config: {
    create: {
      middlewares: ["global::is-user"],
    },
    update: {
      middlewares: ["global::is-user"],
    },
    delete: {
      middlewares: ["global::is-user"],
    },
    find: {
      middlewares: ["global::is-user"],
    },
    findOne: {
      middlewares: ["global::is-user"],
    },
  },
});
