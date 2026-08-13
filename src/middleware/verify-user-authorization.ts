import { AppError } from "@/utils/app-error";
import { Request, Response, NextFunction } from "express";

function verifyUserAuthorization(role: string[]) {
  return (request: Request, ressponse: Response, next: NextFunction) => {
    
    if(!request.user || !role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 401)
    }

    return next()
  }
}

export { verifyUserAuthorization }