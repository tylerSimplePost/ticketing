import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.jwt) {
    throw new Error("JWT KEY NOT DEFINED");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI NOT DEFINED");
  }
  try {
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
