
import type { Request, Response } from "express";
import { saveTask,fetchAllTasks, getSingleTask, updateTask, deleteTask } from "../database/models/TasksModel.js";
import type { TaskType } from "../types/tasks.js";

let taskResponse = (data:Object)=>{
    return {
        status: 200,
        message: "Task Created Successfully",
        data: data,
    }
}
export async function handleGetTaskById (req:Request,res:Response){
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
export async function handleGetAllTasks (req:Request,res:Response){

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
export async function handleCreateTask (req:Request,res:Response){

    let data = req.body as TaskType;
    try{
        console.log("Creating Task with data:", data);
    let response = await saveTask(data) as TaskType;
    res.status(200).json(taskResponse(response));

    } catch (error) {
        console.error("Error Creating Task ❌:", error);
    }
    console.log("Task Created Successfully ✅:");


}
export async function handleUpdateTask (req:Request,res:Response){

    let data = req.body as TaskType;
    let id = req.query.id as string;
    try{
    console.log("Updating Task");
    let response = await updateTask(id,data);
    if(response){
        res.status(200).json(taskResponse(response));
    }else{
        res.status(500).json(taskResponse({}));
    }
    } catch (error) {
        res.status(500).json(taskResponse({}));

        console.error("Error Updating Task ❌:", error);
    }
    console.log("Task Updated Successfully ✅:");

}
export async function handleUpdateTaskDate (req:Request,res:Response){

    let {id} = req.query;
    let date  = req.query.date as string
    try{
    console.log("Updating Task");
    let response = await updateTask(id as string,{taskDeadlineDate:date});
    if(response){
        res.status(200).json(taskResponse(response));
    }else{
        res.status(500).json(taskResponse({}));
    }
    } catch (error) {
        console.error("Error Updating Task ❌:", error);
    }
    console.log("Task Updated Successfully ✅:");

}
export async function handleDEleteTask (req:Request,res:Response){
    try{

        let {id} = req.query;
        let response =  await deleteTask(id as string);
        if(response){
            res.status(200).json({message: "Task Deleted SUccessfully", code:1})
            return;
        }
        res.status(500).json({message: "Task Delete Failed", code:1})

    }catch(e){
        res.status(500).json({message: "Task Delete failed", code:0})

    }
}