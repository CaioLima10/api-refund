import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { Request, Response } from "express";
import { z } from "zod";

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation"
])
class RefundsController {
  async create(request: Request, response: Response) {

    const bodySchema = z.object({
      name: z.string(),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "O valor precisa ser positivo." }),
      filename: z.string()
    })

    const { name, amount, category, filename } = bodySchema.parse(request.body)

    if(!request.user?.id) {
      throw new AppError("Unauthorized", 401)
    }

    const refund = await prisma.refunds.create({
      data:{
        name,
        amount,
        category,
        filename,
        userId: request.user.id

      }
    })

    return response.json(refund)
  }

  async index(request: Request, response: Response) {

    const bodyQuery = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10)
    })

    const { name, page, perPage } = bodyQuery.parse(request.query)

    const skip = (page - 1) * perPage

    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where: {
        user:{
          name: {
            contains: name.trim()
          }
        }
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { 
            id: true,
            name: true, 
            email: true, 
            role: true,
            _count: true,
            createdAt: true,
            updatedAt: true  
          }
        }
      }
    })

    const totalRecords = await prisma.refunds.count({
      where: {
        user: {
          name: {
            contains: name.trim()
          }
        }
      }
    })

    const totalPages = Math.ceil(totalRecords / perPage)

    return response.json({
      refunds, 
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1
      }
    })
  }
}

export { RefundsController }