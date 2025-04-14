import express from "express"
import taskRouter from "./routes/taskRoutes.js"
import cors from "cors"

import userAuthRouter from "./routes/userAuthRoutes.js"
import { AuthMiddleware } from "./middlewares/AuthMiddleware.js"
import notesRouter from "./routes/notesRoutes.js"
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
app.use("/api/v1/notes",notesRouter)


app.listen(PORT, () => {
    console.log("Server running at "+ PORT)
})




