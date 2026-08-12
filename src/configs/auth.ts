import { env } from "@/env";

const configAuth = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: "1d"
  }
}  

export { configAuth }