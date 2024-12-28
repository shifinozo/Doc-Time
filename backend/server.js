import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRouter.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

app.use(express.json())
app.use(cors())

// api endpoints 
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

const port = process.env.PORT || 3000; // Ensure port is defined

app.listen(port, () => console.log(`Server started on PORT:${port}`))