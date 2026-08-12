import express from "express"

const app = express()
app.use(express.json())

app.get("/", (request, response) => {
  response.json({ message: "Olá Caio lima" })
})

export { app }
