

import admin from "firebase-admin";
import path from "path";
const serviceAccount = path.join(__dirname, "firebaseAdminKey.json");

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
