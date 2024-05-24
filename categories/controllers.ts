import { sendResponse } from "../helpers";
import { asyncWrapper } from "../middlewares";
import { Request, Response } from "express";
import { Category } from "./model";

export const createCategory = asyncWrapper(
  async (req: Request, res: Response) => {
    const category = await Category.create(req.body);
    sendResponse(res, { result: category, status: 201 });
  }
);

export const getCategories = asyncWrapper(
  async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const queryObj = {} as any;
    if (search) {
      queryObj.name = { $regex: search, $options: "i" };
    }
    const categories = await Category.find(queryObj).skip(skip).limit(limit);
    const total = Math.ceil((await Category.countDocuments(queryObj)) / limit);
    sendResponse(res, { result: { records: categories, total }, status: 200 });
  }
);

export const getCategory = asyncWrapper(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  sendResponse(res, { result: category, status: 200 });
});

export const updateCategory = asyncWrapper(
  async (req: Request, res: Response) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    sendResponse(res, { result: category, status: 200 });
  }
);

export const deleteCategory = asyncWrapper(
  async (req: Request, res: Response) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    sendResponse(res, { result: category, status: 200 });
  }
);
