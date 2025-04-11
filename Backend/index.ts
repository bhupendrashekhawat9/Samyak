import express from "express"
import taskRouter from "./src/routes/task"
import cors from "cors"
import Database from "./src/database"
import userAuthRouter from "./src/routes/userAuth"
import { AuthMiddleware } from "./src/controllers/auth"
const app = express()
const PORT = 9000;
let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/v1/userAuth",userAuthRouter)
app.use(AuthMiddleware)

app.use("/api/v1/tasks",taskRouter)

app.listen(PORT, () => {
    console.log("Server running at "+ PORT)
})




