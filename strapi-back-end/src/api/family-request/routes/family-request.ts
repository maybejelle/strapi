/**
 * family-request router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  "api::family-request.family-request",
  {
    config: {
      create: {
        middlewares: [],
      },
      update: {
        middlewares: ["global::is-recipient"],
      },
      delete: {
        middlewares: ["global::is-recipient"],
      },
      find: {
        middlewares: ["global::is-recipient"],
      },
      findOne: {
        middlewares: ["global::is-recipient"],
      },
    },
  }
);
