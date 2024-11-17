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
    async handleFamilyRequestUpdate(familyRequestId: string) {
      try {
        // Fetch the family request with recipient and family details
        const request = await strapi
          .query("api::family-request.family-request")
          .findOne({
            where: { id: familyRequestId },
            populate: ["recipient", "family"],
          });

        if (!request) {
          strapi.log.warn(
            `Family request with ID ${familyRequestId} not found.`
          );
          return;
        }

        const { request_status, recipient, family } = request;

        if (request_status === "accepted" && recipient && family) {
          const recipientId = recipient.id;

          // Fetch all entries (draft and published) for the family
          const familyEntries = await strapi
            .query("api::family.family")
            .findMany({
              where: { documentId: family.documentId },
              populate: ["members"], // Fetch current members to avoid overwriting
            });

          for (const entry of familyEntries) {
            const existingMembers = entry.members || [];

            // Add recipient to the existing members if not already present
            const updatedMembers = [
              ...existingMembers.map((member) => member.id),
              recipientId,
            ].filter((value, index, self) => self.indexOf(value) === index); // Ensure no duplicates

            await strapi.query("api::family.family").update({
              where: { id: entry.id },
              data: {
                members: updatedMembers,
                ...(entry.publishedAt ? {} : { publishedAt: null }), // Ensure draft stays as draft
              },
            });

            strapi.log.info(
              `Recipient ${recipientId} successfully added to family ${entry.id} (${entry.publishedAt ? "Published" : "Draft"})`
            );
          }

          // Delete the processed family request
          await strapi.query("api::family-request.family-request").delete({
            where: { id: familyRequestId },
          });

          strapi.log.info(
            `Family request with ID ${familyRequestId} processed and deleted.`
          );
        } else if (request_status === "rejected") {
          strapi.log.info(
            `Family request with ID ${familyRequestId} was rejected.`
          );
          await strapi.query("api::family-request.family-request").delete({
            where: { id: familyRequestId },
          });
        } else {
          strapi.log.warn(
            `Invalid state or missing data for family request ${familyRequestId}`
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
