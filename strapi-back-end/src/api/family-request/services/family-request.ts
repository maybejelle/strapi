/**
 * family-request service
 */

import { factories } from "@strapi/strapi";

type FamilyRequest = {
  id: string;
  request_status: "pending" | "accepted" | "rejected";
  recipient: {
    id: string;
    username: string;
    email: string;
    families: Array<{ id: string; name: string }>;
  };
  family: {
    id: string;
    name: string;
    members: Array<{ id: string; username: string; email: string }>;
  };
};

export default factories.createCoreService(
  "api::family-request.family-request",
  ({ strapi }) => ({
    async handleFamilyRequestUpdate(familyRequestId) {
      try {
        const request = await strapi
          .query("api::family-request.family-request")
          .findOne({
            where: { id: familyRequestId },
            populate: ["recipient", "family"],
          });

        if (!request) {
          strapi.log.warn(`Family request ${familyRequestId} not found.`);
          return;
        }

        const { request_status, recipient, family } = request;

        if (request_status === "accepted" && recipient && family) {
          const familyEntries = await strapi
            .query("api::family.family")
            .findMany({
              where: { documentId: family.documentId },
              populate: ["members"],
            });

          for (const entry of familyEntries) {
            const updatedMembers = Array.from(
              new Set([
                ...entry.members.map((member) => member.id),
                recipient.id,
              ])
            );

            await strapi.query("api::family.family").update({
              where: { id: entry.id },
              data: {
                members: updatedMembers,
              },
            });

            strapi.log.info(
              `Recipient ${recipient.username} added to family ${family.name} (${entry.id}).`
            );
          }

          await strapi.query("api::family-request.family-request").delete({
            where: { id: familyRequestId },
          });

          strapi.log.info(
            `Processed and deleted family request ${familyRequestId}.`
          );
        } else if (request_status === "rejected") {
          strapi.log.info(`Rejected family request ${familyRequestId}.`);
          await strapi.query("api::family-request.family-request").delete({
            where: { id: familyRequestId },
          });
        } else {
          strapi.log.warn(
            `Invalid state or data for family request ${familyRequestId}.`
          );
        }
      } catch (error) {
        strapi.log.error(
          `Error processing family request ${familyRequestId}: ${error.message}`
        );
      }
    },
  })
);
