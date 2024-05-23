import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError, logger } from "./helpers";
import configs from "./configs";
import * as Yup from "yup";

export const asyncWrapper = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  res.status(statusCode);

  if (err instanceof Yup.ValidationError) {
    return res.json({
      error: err.name,
      message: err.message,
      details: err.errors,
    });
  }

  return res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export const deserializerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req?.cookies?.access_token;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId, role } = decoded as {
      userId: string;
      role: "admin" | "candidate" | "recruiter";
    };

    res.locals.currentUserId = userId;
    res.locals.role = role;
  }

  next();
};


export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.cookies?.access_token;

  if (!token) {
    throw ApiError.authenticated("Not authorized");
  }
  if (!res.locals.currentUserId) {
    throw ApiError.authenticated("Not authorized");
  }

  next();
};


export const withValidate = (schema: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const forAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.role !== "admin") {
    throw ApiError.unauthorized("Not authorized");
  }
  next();
};
