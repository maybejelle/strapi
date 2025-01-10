const fcmPushNotification = require("../src/services/fcm-push-notification");
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
      models: ["api::device.device"],
      async afterUpdate(event) {
        const { result } = event;
        const deviceName = result.name;
        const device = await strapi.query("api::device.device").findOne({
          where: { documentId: result.documentId },
          populate: { user: true },
        });
        const temp = device.metadata.temperature;
        if(temp){
          if (temp < 15 && device.user.fcm_token) {
            const message = `Temperature is below 15 degrees Celsius`;
            await fcmPushNotification.sendPushNotification(
              device.user.fcm_token,
              message
            );
          }
          if(temp > 30 && device.user.fcm_token){
            const message = `Temperature is above 30 degrees Celsius`;
            await fcmPushNotification.sendPushNotification(
              device.user.fcm_token,
              message
            );
          }
        }
        try {
          await strapi.entityService.create("api::log.log", {
            data: {
              logType: "update",
              description: `Device ${deviceName} was updated on ${new Date().toISOString()}`,
              user: device.user.documentId,
            },
          });
        } catch (err) {
          console.log(err);
        }
      },
      async afterCreate(event) {
        const { result } = event;
        const deviceName = result.name;
        const device = await strapi.query("api::device.device").findOne({
          where: { documentId: result.documentId },
          populate: { user: true },
        });
        try {
          if (result.created_at === result.updated_at) {
            await strapi.entityService.create("api::log.log", {
              data: {
                logType: "add",
                description: `Device ${deviceName} was created on ${new Date().toISOString()}`,
                user: device.user.documentId,
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
    });
    strapi.db.lifecycles.subscribe({
      models : ['api::location.location'],
      async afterUpdate(event) {
        const { result } = event;
        const locationName = result.name;
        const location = await strapi.query('api::location.location').findOne({
          where: { documentId: result.documentId },
          populate: { user: true }
        });

        try {
          await strapi.entityService.create('api::log.log', {
            data: {
              logType: 'update',
              description: `Location ${locationName} was updated on ${new Date().toISOString()}`,
              user: location.user.documentId
            }
          });
        } catch (err) {
          console.log(err);
        }
      },
      async afterCreate(event) {
        const { result } = event;
        const locationName = result.name;
        const location = await strapi.query('api::location.location').findOne({
          where: { documentId: result.documentId },
          populate: { user: true }
        });

        try {
          if (result.created_at === result.updated_at) {
            await strapi.entityService.create('api::log.log', {
              data: {
                logType: 'add',
                description: `Location ${locationName} was created on ${new Date().toISOString()}`,
                user: location.user.documentId
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
    strapi.db.lifecycles.subscribe({
      models: ["api::family-request.family-request"],

      async afterCreate(event) {
        const { result } = event;
        const id = result.documentId;

        const familyRequest = await strapi
          .query("api::family-request.family-request")
          .findOne({
            where: { documentId: id },
            populate: { recipient: true },
          });

        if (familyRequest.recipient.fcm_token) {
          const message = `You have a new family request `;
          console.log(familyRequest.recipient.fcm_token);
          await fcmPushNotification.sendPushNotification(
            familyRequest.recipient.fcm_token,
            message
          );
        }
      },

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
