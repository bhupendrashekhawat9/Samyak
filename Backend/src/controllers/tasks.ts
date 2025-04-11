import Database from "../database";
import { saveTask,fetchAllTasks, getSingleTask, updateTask, deleteTask } from "../database/models/Tasks";
import { TaskType } from "../types/tasks";

let taskResponse = (data:TaskType)=>{
    return {
        status: 200,
        message: "Task Created Successfully",
        data: data,
    }
}
export async function handleGetTaskById (req,res){
    let id = req.query.id as string;
    try{
        let tasks = await getSingleTask(id)
        res.status(200).json({
            status: 200,
            message: "Task details Fetched Successfully",
            data: tasks,
        })
        console.log("All Tasks Fetched Successfully ✅:", tasks);
    } catch (error) {
        console.error("Error Fetching All Tasks ❌:", error);
        res.status(500).json({
            status: 500,
            message: "Error Fetching All Tasks",
            data: null,
        })
    }
}
export async function handleGetAllTasks (req,res){

    try{
        let tasks = await fetchAllTasks()
        res.status(200).json({
            status: 200,
            message: "All Tasks Fetched Successfully",
            data: tasks,
        })
        console.log("All Tasks Fetched Successfully ✅:", tasks);
    } catch (error) {
        console.error("Error Fetching All Tasks ❌:", error);
        res.status(500).json({
            status: 500,
            message: "Error Fetching All Tasks",
            data: null,
        })
    }
}
export async function handleCreateTask (req:Express.Request,res:Express.Response){

    let data = req.body;
    try{
        console.log("Creating Task with data:", data);
    let response = await saveTask(data) as TaskType;
    res.status(200).json(taskResponse(response));

    } catch (error) {
        console.error("Error Creating Task ❌:", error);
    }
    console.log("Task Created Successfully ✅:");


}
export async function handleUpdateTask (req:Express.Request,res:Express.Response){

    let data = req.body as TaskType;
    let id = req.query.id as string;
    try{
    console.log("Updating Task");
    let response = await updateTask(id,data);
    res.status(200).json(taskResponse(response));
    } catch (error) {
        console.error("Error Updating Task ❌:", error);
    }
    console.log("Task Updated Successfully ✅:");

}
export async function handleUpdateTaskDate (req:Express.Request,res:Express.Response){

    let {date,id} = req.query;
    try{
    console.log("Updating Task");
    let response = await updateTask(id,{taskDeadlineDate:date});
    res.status(200).json(taskResponse(response));
    } catch (error) {
        console.error("Error Updating Task ❌:", error);
    }
    console.log("Task Updated Successfully ✅:");

}
export async function handleDEleteTask (req:Express.Request,res:Express.Response){
    try{

        let {id} = req.query;
        let response =  await deleteTask(id);
        if(response){
            res.status(200).json({message: "Task Deleted SUccessfully", code:1})
            return;
        }
        res.status(500).json({message: "Task Delete Failed", code:1})

    }catch(e){
        res.status(500).json({message: "Task Delete failed", code:0})

    }
}