import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(req: Request, _res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.originalUrl} Request payload: ${JSON.stringify(req?.body)} ip:: ${req.ip}`);
  next();
}