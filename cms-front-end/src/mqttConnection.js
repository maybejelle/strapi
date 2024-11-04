
import mqtt from "mqtt";

let client;

export function connectMqtt() {
  // Define your broker URL and options
  const brokerUrl =
    "wss://78a1f2fe09ea45d9949a329d1b635e46.s1.eu.hivemq.cloud:8884/mqtt"; // Example MQTT broker
  const options = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    username: "project",
    password: "project03",
  };

  client = mqtt.connect(brokerUrl, options);

  client.on("connect", () => {
    console.log("Connected to MQTT broker");
  });

  client.on("error", (error) => {
    console.error("MQTT Connection Error:", error);
  });

  return client;
}

export function subscribe(topic) {
  if (client && client.connected) {
    client.subscribe(topic, (error) => {
      if (error) {
        console.error("Subscription Error:", error);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
  }
}

export function publish(topic, message) {
  if (client && client.connected) {
    client.publish(topic, message);
  }
}

export function onMessage(callback) {
  if (client) {
    client.on("message", callback);
  }
}
