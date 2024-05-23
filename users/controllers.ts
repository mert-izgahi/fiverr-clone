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
