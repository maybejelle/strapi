/**
 * location router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::location.location',{
    config: {
        create: {
            middlewares: [
                'global::is-owner'
            ]
        },
        update: {
            middlewares: [
                'global::is-owner'
            ]
        },
        delete: {
            middlewares: [
                'global::is-owner'
            ]
        },
        find: {
            middlewares: [
                'global::is-owner'
            ]
        },
        findOne: {
            middlewares: [
                'global::is-owner'
            ]
        }
    }
});
