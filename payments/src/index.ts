import mongoose from "mongoose";

import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

import { OrderCancelledListener } from "./listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./listeners/order-created-listener";

const start = async () => {
  console.log("starting!");
  if (!process.env.jwt) {
    throw new Error("JWT KEY NOT DEFINED");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI NOT DEFINED");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS CLIENT ID NOT DEFINED");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS URL NOT DEFINED");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS CLUSTER ID NOT DEFINED");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB!");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000!!!");
  });
};

start();
