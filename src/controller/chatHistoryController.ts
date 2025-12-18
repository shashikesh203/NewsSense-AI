import { Request, Response, NextFunction } from "express";
import {
  getHistoryFromPostgres,
  deleteHistoryFromPostgres,
} from "../utils/helpers/historyService";
import { HttpStatusCode } from "../utils/enums/httpStatusCode";
import { CustomError } from "../utils/helpers/customError";

// GET /history/:session_id
export const fetchSessionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session_id } = req.params;

  try {
    const sessionHistory = await getHistoryFromPostgres({
      sessionId: session_id,
    });
    if (!sessionHistory) {
      return res.status(HttpStatusCode.OK).json({
        data: null,
        message: `No history found for session ${session_id}`,
      });
    }
    res.status(HttpStatusCode.OK).json({
      data: sessionHistory,
      message: `History for session ${session_id} fetched successfully`,
    });
  } catch (err) {
    console.error(err);
    next(
      new CustomError(
        "Failed to fetch history",
        HttpStatusCode.SERVICE_UNAVAILABLE
      )
    );
  }
};

// DELETE /history/:session_id
export const deleteSessionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { session_id } = req.params;

  try {
    const response = await getHistoryFromPostgres({ sessionId: session_id });
    if (!response) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        data: null,
        message: `No history found for session ${session_id}`,
      });
    }
    await deleteHistoryFromPostgres({ sessionId: session_id });
    res.json({
      data: null,
      message: `History for session ${session_id} deleted`,
    });
  } catch (err) {
    console.error(err);
    next(
      new CustomError(
        "Failed to delete history",
        HttpStatusCode.SERVICE_UNAVAILABLE
      )
    );
  }
};
