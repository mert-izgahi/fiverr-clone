import mongoose from "mongoose";
import configs from "./configs";
import pino from "pino";
import { Response } from "express";
export class ApiError extends Error {
  status: number;
  title: string;
  constructor(status: number, message: string, title: string) {
    super(message);
    this.status = status;
    this.title = title;
  }

  static badRequest(message: string) {
    return new ApiError(400, message, "BAD_REQUEST_ERROR");
  }

  static internal(message: string) {
    return new ApiError(500, message, "INTERNAL_SERVER_ERROR");
  }

  static authenticated(message: string) {
    return new ApiError(401, message, "UNAUTHORIZED_ERROR");
  }

  static notFound(message: string) {
    return new ApiError(404, message, "NOT_FOUND_ERROR");
  }

  static unauthorized(message: string) {
    return new ApiError(403, message, "FORBIDDEN_ERROR");
  }
}

export const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(configs.MONGO_URI as string);
    logger.info("👉 MongoDB connected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

interface IResponseData {
  result: any;
  status: number;
}

export const sendResponse = (res: Response, data: IResponseData) => {
  res.status(data.status).json({
    result: data.result,
    status: data.status,
  });
};
