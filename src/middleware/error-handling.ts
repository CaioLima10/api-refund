import { AppError } from "@/utils/app-error";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

const errorHandling: ErrorRequestHandler = (
    error: any, 
    _request, 
    response, 
    _next ) => {    
  if(error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message })
    return
  }
  
  if(error instanceof ZodError) {
    response.status(400).json({ 
      message: "validation error", 
      issues: error.format() 
    })
    return
  }

  response.status(500).json({ message: error.message })
  return
}

export { errorHandling }