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
    type: "NEW_ORDER",
  });

  sendResponse(res, { result: order, status: 201 });
});

export const getBuyerOrders = asyncWrapper(
  async (req: Request, res: Response) => {
    const { currentUserId } = res.locals;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const orders = await Order.find({ buyer: currentUserId })
      .populate("seller gig")
      .skip(skip)
      .limit(limit);

    const total = Math.ceil(
      (await Order.countDocuments({ buyer: currentUserId })) / limit
    );
    sendResponse(res, {
      result: {
        records: orders,
        total,
      },
      status: 200,
    });
  }
);

export const getSellerOrders = asyncWrapper(
  async (req: Request, res: Response) => {
    const { currentUserId } = res.locals;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ seller: currentUserId })
      .populate("buyer gig")
      .skip(skip)
      .limit(limit);

    const total = Math.ceil(
      (await Order.countDocuments({ seller: currentUserId })) / limit
    );


    sendResponse(res, { result: {
      records: orders,
      total,
    }, status: 200 });
  }
);
