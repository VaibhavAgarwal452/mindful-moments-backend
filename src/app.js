import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// routes import 
import userRouter from "./routes/user.routes.js"
import QuotesRouter from "./routes/quote.routes.js"
import CollectionRouter from "./routes/collection.routes.js"

//routes declaration
app.get("/", (req, res) => {
    res.send("working")
})
app.use("/api/v1/users", userRouter)
app.use("/api/v1/quotes", QuotesRouter)
app.use("/api/v1/collections", CollectionRouter)



export { app }