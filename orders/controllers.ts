import { sendResponse } from "../helpers";
import { asyncWrapper } from "../middlewares";
import { Request, Response } from "express";
import { Order } from "./model";
import { Gig } from "../gigs/model";
import { notificationManager } from "../notifications/NotificationManager";

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
    buyer: currentUserId,
    price: gig.price,
    paymentIntentId: paymentIntentId,
    paymentStatus: paymentStatus,
  };

  const order = await Order.create(args);

  // Create notification
  await notificationManager.createNotification({
    userId: gig.seller._id as string,
    message: `New order from ${currentUserId}`,
    isRead: false,
    payload: {
      gigId: gig._id,
      seller: gig.seller._id,
    },
    type:"NEW_ORDER"
  });

  sendResponse(res, { result: order, status: 201 });
});

export const getOrders = asyncWrapper(async (req: Request, res: Response) => {
  const { currentUserId } = res.locals;
  const orders = await Order.find({ buyer: currentUserId }).populate("gig");
  sendResponse(res, { result: orders, status: 200 });
});
