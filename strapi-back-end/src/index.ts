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
      models: ['api::friend-request.friend-request'],

      async afterUpdate(event) {
        const { result } = event;
        const { request_status } = result;

        // Check if the friend request is accepted
        if (request_status === 'accepted') {
          try {
            // Fetch requester and recipient data with their friend lists
            const request = await strapi.entityService.findOne(
              'api::friend-request.friend-request',
              result.id,
              { populate: ['requester', 'recipient'] }
            );

            if (request.requester && request.recipient) {
              const requesterId = request.requester.id;
              const recipientId = request.recipient.id;

              strapi.log.info(`Updating friends for requester ${requesterId} and recipient ${recipientId}`);

              // Update friends list for requester
              await strapi.entityService.update('plugin::users-permissions.user', requesterId, {
                data: {
                  friends: [
                    ...(request.requester.friends ? request.requester.friends.map(friend => friend.id) : []),
                    recipientId,
                  ],
                },
              });

              // Update friends list for recipient
              await strapi.entityService.update('plugin::users-permissions.user', recipientId, {
                data: {
                  friends: [
                    ...(request.recipient.friends ? request.recipient.friends.map(friend => friend.id) : []),
                    requesterId,
                  ],
                },
              });

              // Delete the friend request after updating friends
              await strapi.entityService.delete('api::friend-request.friend-request', result.id);

              strapi.log.info(`Friend request with ID ${result.id} deleted after becoming friends`);
            } else {
              strapi.log.error(`Requester or recipient data is missing for friend-request id: ${result.id}`);
            }
          } catch (error) {
            strapi.log.error(`Failed to update friends or delete friend request: ${error}`);
          }
        }
      },
    });
  },
};