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
    // Listen to lifecycle events for the friend-request model
    strapi.db.lifecycles.subscribe({
      models: ["api::friend-request.friend-request"],

      async afterUpdate(event) {
        const { result } = event;
        const { request_status } = result;

        // Check if the friend request is accepted
        if (request_status === "accepted") {
          try {
            // Fetch requester and recipient data with their family data
            const request = await strapi.entityService.findOne(
              "api::friend-request.friend-request",
              result.id,
              { populate: ["requester", "recipient"] }
            );

            const recipient = await strapi
              .query("plugin::users-permissions.user")
              .findOne({
                where: { id: request.recipient.id },
                populate: { family_owner: true },
              });

            if (recipient.family_owner.documentId === null) {
              return strapi.log.error("Recipient does not have a family");
            }

            const family = await strapi.query("api::family.family").findOne({
              where: { documentId: recipient.family_owner.documentId },
              populate: { members: true },
            });

            console.log(family);

            if (!family) {
              strapi.log.error(`Family not found.`);
              return;
            }

            if (request.requester && request.recipient) {
              const requesterId = request.requester.id;
              const familyId = family.id;

              strapi.log.info(
                `Adding requester ${requesterId} to family ${familyId}`
              );

              // Add the requester to the family members
              await strapi.entityService.update(
                "api::family.family",
                familyId,
                {
                  data: {
                    members: [
                      ...(family.members
                        ? family.members.map((member) => member.id)
                        : []),
                      requesterId,
                    ],
                  },
                }
              );

              strapi.log.info(
                `Requester ${requesterId} added to family ${familyId}`
              );

              // Delete the friend request after adding the user to the family
              await strapi.entityService.delete(
                "api::friend-request.friend-request",
                result.id
              );

              strapi.log.info(
                `Friend request with ID ${result.id} deleted after processing`
              );
            } else {
              strapi.log.error(
                `Requester or recipient data is missing for friend-request id: ${result.id}`
              );
            }
          } catch (error) {
            strapi.log.error(
              `Failed to add user to family or delete friend request: ${error}`
            );
          }
        }
      },
    });
  },
};
