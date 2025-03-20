import express from "express"
const app = express()

const PORT = 9000;

app.route("/tasks/allTasks").get(getAllTasks)

app.listen(PORT, () => {
    console.log("Server running at "+ PORT)
})




