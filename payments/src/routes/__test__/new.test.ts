import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/orders";
import { OrderStatus } from "@to2tickets/common";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin())
    .send({
      token: new mongoose.Types.ObjectId().toHexString(),
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin())
    .send({
      token: new mongoose.Types.ObjectId().toHexString(),
      orderId: order.id,
    })
    .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
    status: OrderStatus.Cancelled,
    userId: userId,
    version: 0,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin(userId))
    .send({
      token: new mongoose.Types.ObjectId().toHexString(),
      orderId: order.id,
    })
    .expect(400);
});

// it("returns a 201 with valid inputs", async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();
//   const price = Math.floor(Math.random() * 100000);
//   const order = Order.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     userId,
//     version: 0,
//     price,
//     status: OrderStatus.Created,
//   });
//   await order.save();

//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", await global.signin(userId))
//     .send({
//       token: "tok_visa",
//       orderId: order.id,
//     });

//   const stripeCharges = await stripe.charges.list({ limit: 50 });
//   const stripeCharge: any = stripeCharges.data.find((charge: any) => {
//     return charge.amount === order.price * 100;
//   });

//   expect(stripeCharge).toBeDefined();
//   // const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

//   const payment = await Payment.findOne({
//     orderId: order.id,
//     stripeId: stripeCharge!.id,
//   });

//   expect(payment).not.toBeNull();
// });
