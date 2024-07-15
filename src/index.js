import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from './app.js'
import { cronjobs } from "./utils/cronjobs.js"

dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            // cronjobs()
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })