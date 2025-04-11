import DoAjax from "@utils/fetch";
import { TaskType } from "../screens/Dashboard/constants";

export let fetchAllTasks = async () => {
    try{
        let response = await DoAjax.get("/tasks/getAllTasks").exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return []
    }
} 
export let fetchTaskById = async (id: string) => {
    try{
        let response = await DoAjax.get(`/tasks/fetchTaskById?value=${id}`).exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error fetching task by ID:", error);
        return null
    }
}
export let fetchFilterTaskByName = async (name: string) => {
    try{
        let response = await DoAjax.get(`/tasks/fetchTaskByName?value=${name}`).exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error fetching task by name:", error);
        return null
    }
}
export let createTask = async (task: TaskType) => {
    try{
        let response = await DoAjax.post("/tasks/createTask").payload(task).exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error creating task:", error);
        return null
    }
}
export const updateTaskStatus = async (id:string,status:TaskType["taskStatus"]) => {
    try{
        let response = await DoAjax.post(`/tasks/updateTask?id=${id}`).payload({taskStatus:status}).exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error updating task status:", error);
        return null
    }
}

export const updateTaskDate = async (id:string,date:string) => {
    try{
        let response = await DoAjax.post(`/tasks/updateTaskDate?id=${id}&date=${date}`).exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error updating task date:", error);
        return null
    }
}
export const updateTaskTimeSpent = async (id:string,timeSpentInSeconds:number) => {
    try{
        let response = await DoAjax.post(`/tasks/updateTaskTimeSpent?id=${id}&timeSpentInSeconds=${timeSpentInSeconds}`).exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error updating task time spent:", error);
        return null
    }
}
export const updateTask = async (id:string, task:TaskType) => {
    try{
        
        let response = await DoAjax.post(`/tasks/updateTask?id=${id}`).payload(task).exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error updating task:", error);
        return null
    }
}
export const deleteTask = async (id:string) => {
    try{
        let response = await DoAjax.post(`/tasks/deleteTask?id=${id}`).exec()
        const data = await response;
        return data;
    } catch (error) {
        console.error("Error delete task:", error);
        return null
    }
}