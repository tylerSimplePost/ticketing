import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  OrderStatus,
  NotAuthorizedError,
} from "@to2tickets/common";
import { stripe } from "../stripe";
import { Order } from "../models/orders";
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/payments",
  // requireAuth,
  [
    // body("token").not().isEmpty(),
    body("orderId").not().isEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    console.log("orderID", orderId);
    const order = await Order.findById({ _id: orderId });
    console.log("order", order);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Ticket",
              },
              unit_amount: order.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });
      res.status(200).json({ sessionId: session.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  //   const charge = await stripe.charges.create({
  //     currency: "usd",
  //     amount: order.price * 100,
  //     source: token,
  //   });
  //   const payment = Payment.build({
  //     orderId,
  //     stripeId: charge.id,
  //   });
  //   await payment.save();
  //   await new PaymentCreatedPublisher(natsWrapper.client).publish({
  //     id: payment.id,
  //     orderId: payment.orderId,
  //     stripeId: payment.stripeId,
  //   });
  //   res.status(201).send({ id: payment.id });
  // }
);

export { router as createChargeRouter };
