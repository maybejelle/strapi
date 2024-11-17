// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["api::family-request.family-request"],

      async afterUpdate(event) {
        const { result } = event;
        const familyRequestId = result.id;

        try {
          // Call the service to handle the family request update
          await strapi
            .service("api::family-request.family-request")
            .handleFamilyRequestUpdate(familyRequestId);
        } catch (error) {
          strapi.log.error(
            `Error processing family request ${familyRequestId}: ${error.message}`
          );
        }
      },
    });
  },
};
