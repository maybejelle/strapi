

import admin from "firebase-admin";
const serviceAccount = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain,
} as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  async sendPushNotification(fcmToken, message) {
    const messagePayload = {
      notification: {
        title: "New Family Request",
        body: message,
      },
      token: fcmToken,
    };

    try {
      const response = await admin.messaging().send(messagePayload);
      console.log("Successfully sent message:", response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
};
