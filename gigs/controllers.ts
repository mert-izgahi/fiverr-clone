import { sendResponse } from "../helpers";
import { asyncWrapper } from "../middlewares";
import { Request, Response } from "express";
import { Gig } from "./model";

export const createGig = asyncWrapper(async (req: Request, res: Response) => {
  const { currentUserId } = res.locals;
  req.body.seller = currentUserId;
  const gig = await Gig.create(req.body);
  sendResponse(res, { result: gig, status: 201 });
});

export const getGigs = asyncWrapper(async (req: Request, res: Response) => {
  const search = req.query.search as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const queryObj = {} as any;
  if (search) {
    queryObj.title = { $regex: search, $options: "i" };
  }
  const gigs = await Gig.find(queryObj).skip(skip).limit(limit);
  const total = Math.ceil((await Gig.countDocuments(queryObj)) / limit);
  sendResponse(res, { result: { records: gigs, total }, status: 200 });
});

export const getGigsBySellerId = asyncWrapper(
  async (req: Request, res: Response) => {
    const { sellerId } = req.params;
    const search = req.query.search as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const queryObj = {
      seller: sellerId,
    } as any;
    if (search) {
      queryObj.title = { $regex: search, $options: "i" };
    }
    const gigs = await Gig.find(queryObj).skip(skip).limit(limit);
    const total = Math.ceil((await Gig.countDocuments(queryObj)) / limit);
    sendResponse(res, { result: { records: gigs, total }, status: 200 });
  }
);

export const getGig = asyncWrapper(async (req: Request, res: Response) => {
  const gig = await Gig.findById(req.params.id);
  sendResponse(res, { result: gig, status: 200 });
});

export const updateGig = asyncWrapper(async (req: Request, res: Response) => {
  const gig = await Gig.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  sendResponse(res, { result: gig, status: 200 });
});

export const deleteGig = asyncWrapper(async (req: Request, res: Response) => {
  const gig = await Gig.findByIdAndDelete(req.params.id);
  sendResponse(res, { result: gig, status: 200 });
});
