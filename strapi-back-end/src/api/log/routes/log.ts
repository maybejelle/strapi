/**
 * log router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::log.log', {
    config: {
        create: {
            middlewares: [
            ]
        },
        update: {
            middlewares: [
            ]
        },
        delete: {
            middlewares: [
            ]
        },
        find: {
            middlewares: [
                'global::LogsMiddleware'
            ]
        },
        findOne: {
            middlewares: [
            ]
        }
    }
});
