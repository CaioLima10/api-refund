import "express-async-errors"
import express from "express"
import cors from "cors"
import { errorHandling } from "./middleware/error-handling"
import { routes } from "./routes"

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandling)

export { app }
