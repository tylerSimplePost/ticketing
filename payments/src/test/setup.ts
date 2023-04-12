import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?: string) => Promise<string[]>;
}
process.env.STRIPE_KEY =
  "sk_test_51LeLkNJq9iIX8tEXFmGJtE5yYX5Kv1i63tI3rjujSv4ixPbthxFCMqI47haAVm2zfFc2sqXzaIfTqErfjupmnrjn00qVbAlvWR";
let mongo: any;

jest.mock("../nats-wrapper");

beforeAll(async () => {
  jest.clearAllMocks();
  process.env.jwt = "secret";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async (id?: string) => {
  // build a jwt payload { id, email }

  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // create the jwt
  const token = jwt.sign(payload, process.env.jwt!);
  // build session object { jwt: MY_JWT }
  const session = { jwt: token };
  // turn that session into json
  const sessionJSON = JSON.stringify(session);
  // take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
