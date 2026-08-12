import { prisma } from "@/database/prisma"
import { UserRole } from "@prisma/client"
import { Request, Response } from "express"
import { z } from "zod"

import { hash } from "bcrypt"
import { AppError } from "@/utils/app-error"

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Nome é obrigatório" }),
      email: 
        z.string()
        .trim()
        .email({ message: "E-mail inválido" })
        .toLowerCase(),
      password: z.string().min(6, { message: "A senha deve ter pelo menos 6 digitos" }),
      role: 
        z.enum([ UserRole.employer, UserRole.manager ])
        .default(UserRole.employer)
    })

    const { name, email, password, role  } = bodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

    if(userWithSameEmail) {
      throw new AppError("Já existe um usuário cadastrado com esse e-mail")
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, 
        role
      }
    })
    const { password: _, ...withoutPasswordUser } = user 

    return response.status(201).json(withoutPasswordUser)

  }
}

export { UsersController }