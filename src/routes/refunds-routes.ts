import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middleware/verify-user-authorization";
import { UserRole } from "@prisma/client";

const refundsRoutes = Router()

const refundsController = new RefundsController()

refundsRoutes.post("/", 
  verifyUserAuthorization([UserRole.employer]),
  refundsController.create
)

refundsRoutes.get("/", 
  verifyUserAuthorization([UserRole.manager]),
  refundsController.index
)

export { refundsRoutes }