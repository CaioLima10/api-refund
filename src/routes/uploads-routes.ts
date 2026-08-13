import { Router } from "express";
import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthorization } from "@/middleware/verify-user-authorization";
import { UserRole } from "@prisma/client";

import multer from "multer";
import uploadConfig from "@/configs/upload"

const uploadsRoutes = Router()

const uploadsController = new UploadsController()

const upload = multer(uploadConfig.MULTER)

uploadsRoutes.post("/", 
  upload.single("file"),
  verifyUserAuthorization([UserRole.employer]), 
  uploadsController.create
)

export { uploadsRoutes }