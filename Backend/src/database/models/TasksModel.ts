import mongoose, { Model } from "mongoose";

import type { TaskType } from "../../types/tasks.js";
import Database from "../index.js";


let Schema = mongoose.Schema;

let taskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        required: true
    },
    taskDeadlineDate: {
        type: String,
        required: true
    },
    taskCreatedDate: {
        type: String,
        required: true
    },
    taskCreatedBy: {
        type: String,
        required: true
    },
    taskPriority: {
        type: String,
        required: true
    },
    taskParentRefId: {
        type: String,
        required: false
    },
    taskAttachments: {
        type: Array,
        default: []
    },
    taskCategory: {
        type: String,
        required: false
    },
    taskTimeSpentInSeconds: {
        type: Number,   
        required: false
    },
});
let TaskModel= mongoose.model("tasks", taskSchema);
export default TaskModel;



export let saveTask = async (data: TaskType): Promise<TaskType|null> => {
     await Database.connect()
    try {
        let newTask =  new TaskModel(data);
        let response = await newTask.save()
        return response.toObject() as TaskType;
        } catch (error: any) {
        console.error("Error Saving Task ❌:", error);
        return null;
    }

}
export let getSingleTask = async (id: string) => {
    await Database.connect()
   try {
       let response =await  TaskModel.findById(id).exec();
       return response ? response.toObject() : null     
       } catch (error: any) {
       console.error("Error getting Task ❌:", error);
       return null;
   }
}
export let getTasks = async (id: string[]) => {
    await Database.connect()
   try {
       let response = await TaskModel.find({_id:{$in:id}}).exec();
       return response? response.map((task: any) => task.toObject()) : null
       } catch (error: any) {
       console.error("Error fetch Tasks ❌:", error);
       return null;
   }
}
export const fetchAllTasks = async () => {
    await Database.connect()
   try {
       let response = await TaskModel.find().exec();
       console.log("All Tasks Fetched Successfully ✅:", response.map(i => i.toJSON()));
       return response ? response.map((i)=> ({...i.toJSON(  ),taskId:i.id})) : []
       } catch (error: any) {
       console.error("Error fetching all Task ❌:", error);
       return null;
   }
}
export let updateTask = async (id: string, data: TaskType) => {
    await Database.connect()
    try {
       let response =  await TaskModel.updateOne(
            { _id: id },
            { $set: data }
        ).exec();
        return response ? response : null
    }catch (error: any) {
        console.error("Error updating Task ❌:", error);
        return null;
    }
}
export let deleteTask = async (id:string)=>{
    try{
        console.log("Deleting task "+ id);
       let response =  await TaskModel.deleteMany({_id:{$in:id.split(",")}}).exec();
       
       return response??null
    }catch(e){
        console.log("Failed to delete task "+ e)
    }
}