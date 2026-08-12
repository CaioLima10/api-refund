import { Request, Response } from "express";

class RefundsController {
  create(request: Request, response: Response) {
    return response.json({ message: "tudo ok por aqui Caio" })
  }
}

export { RefundsController }