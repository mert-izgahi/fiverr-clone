import { ApiError, sendResponse } from "../helpers";
import { asyncWrapper } from "../middlewares";
import { Request, Response } from "express";
import { User } from "./model";

export const signUp = asyncWrapper(async (req: Request, res: Response) => {
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) {
    throw ApiError.authenticated("Email already exists");
  }

  const account = await User.create(req.body);

  const token = await account.generateToken();

  res.cookie("access_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });

  sendResponse(res, { result: account, status: 201 });
});

export const signIn = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const account = await User.findOne({ email });
  if (!account) {
    throw ApiError.authenticated("Account not found");
  }
  const isMatch = await account.comparePassword(password);
  if (!isMatch) {
    throw ApiError.authenticated("Incorrect password");
  }
  const token = await account.generateToken();
  res.cookie("access_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });

  //   res.status(200).json({ result: account, status: 200 });
  sendResponse(res, { result: account, status: 200 });
});

export const signOut = asyncWrapper(async (req: Request, res: Response) => {
  res.clearCookie("access_token");
  //   res.status(200).json({ result: "success", status: 200 });
  sendResponse(res, { result: "success", status: 200 });
});

export const updateAccount = asyncWrapper(
  async (req: Request, res: Response) => {
    const { currentUserId } = res.locals;
    const account = await User.findByIdAndUpdate(currentUserId, req.body, {
      new: true,
    });

    // res.status(200).json({ result: account, status: 200 });
    sendResponse(res, { result: account, status: 200 });
  }
);

export const updatePassword = asyncWrapper(
  async (req: Request, res: Response) => {
    const { currentUserId } = res.locals;
    const account = await User.findById(currentUserId);
    if (!account) {
      throw ApiError.authenticated("Account not found");
    }
    const isMatch = await account.comparePassword(req.body.oldPassword);
    if (!isMatch) {
      throw ApiError.authenticated("Incorrect password");
    }
    account.password = req.body.newPassword;
    await account.save();

    //res.status(200).json({ result: account, status: 200 });
    sendResponse(res, { result: account, status: 200 });
  }
);

export const deleteAccount = asyncWrapper(
  async (req: Request, res: Response) => {
    const { currentUserId } = res.locals;
    const account = await User.findByIdAndDelete(currentUserId);
    sendResponse(res, { result: account, status: 200 });
  }
);

export const getAccount = asyncWrapper(async (req: Request, res: Response) => {
  const { currentUserId } = res.locals;
  const account = await User.findById(currentUserId);
  sendResponse(res, { result: account, status: 200 });
});



export const getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
  const search = req.query.search as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const queryObj = {} as any;
  if (search) {
    queryObj["$or"] = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  const users = await User.find(queryObj).skip(skip).limit(limit);
  const total = Math.ceil((await User.countDocuments(queryObj)) / limit);

  sendResponse(res, {
    result: {
      records: users,
      total,
    },
    status: 200,
  });
});

export const getOneUser = asyncWrapper(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  sendResponse(res, { result: user, status: 200 });
});

export const updateUser = asyncWrapper(async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  sendResponse(res, { result: user, status: 200 });
});

export const deleteUser = asyncWrapper(async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  sendResponse(res, { result: user, status: 200 });
});
