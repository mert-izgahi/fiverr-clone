import { sendResponse } from "../helpers";
import { asyncWrapper } from "../middlewares";
import { Request, Response } from "express";
import { Order } from "./model";
import { Gig } from "../gigs/model";
import configs from "../configs";
const stripe = require("stripe")(configs.STRIPE_SECRET_KEY);

export const createOrder = asyncWrapper(async (req: Request, res: Response) => {
  const { currentUserId } = res.locals;
  req.body.buyer = currentUserId;

  const { gigId, paymentIntentId, paymentStatus } = req.body;

  const gig = await Gig.findById(gigId).populate("seller");
  if (!gig) return sendResponse(res, { result: "gig not found", status: 404 });

  const args = {
    gig: gig._id,
    gigTitle: gig.title,
    gigCoverUrl: gig.coverUrl,
    seller: gig.seller._id,
    price: gig.price,
    paymentIntentId: paymentIntentId,
    paymentStatus: paymentStatus,
  };

  const order = await Order.create(args);

  sendResponse(res, { result: order, status: 201 });
});

export const checkSessionState = asyncWrapper(
  async (req: Request, res: Response) => {
    const sessionId = req.query.session_id as string;

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        "line_items",
        "line_items.data.price.product",
        "customer_details",
      ],
    });

    sendResponse(res, {
      result: {
        id: session.id,
        status: session.status,
        line_items: session.line_items,
        customer_details: session.customer_details,
      },
      status: 200,
    });
  }
);
