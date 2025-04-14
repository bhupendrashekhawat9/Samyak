import mongoose, { Model } from "mongoose";

import Database from "../index.js";
import { TaskType } from "../../types/tasks.js";


export interface NoteType {
    noteId?: string;
    noteBody: string;
    noteRefId: string;
    noteCreatedBy: string;
    noteCreatedAt: string;
}


let Schema = mongoose.Schema;

let noteSchema = new Schema({
    noteBody: {
        type: String,
        required: true
    },
    noteRefId: {
        type: String,
        required: true,
        ref: "tasks"
    },
    noteCreatedBy: {
        type: String,
        required: true,
        ref: "users"
    },
    noteCreatedAt: {
        type: String,
        required: true
    },  
    
});
let NoteModel= mongoose.model("notes", noteSchema);
export default NoteModel;

export let getNotesByRefId = async (id: string) => {
    await Database.connect()
    try {
        let response = await NoteModel.findOne({noteRefId:id}).exec();
        console.log(response,"response notes")
        console.log(id,"response notes ref id")

        return response 
    } catch (error: any) {
        console.error("Error getting Notes by Ref Id ❌:", error);
        return null;
    }
}

export let saveNote = async (data: NoteType) => {
     await Database.connect()
    try {
       
        let response = await NoteModel.create(data)
        return response;
        } catch (error: any) {
        console.error("Error Saving Note ❌:", error);
        return null;
    }

}
export let getSingleNote = async (id: string) => {
    await Database.connect()
   try {
       let response =await  NoteModel.findById(id).exec();
       return response ? response.toObject() : null     
       } catch (error: any) {
       console.error("Error getting Note ❌:", error);
       return null;
   }
}
export let getNotes = async (id: string[]) => {
    await Database.connect()
   try {
       let response = await NoteModel.find({_id:{$in:id}}).exec();
       return response? response.map((note: any) => note.toObject()) : null
       } catch (error: any) {
       console.error("Error fetch Notes ❌:", error);
       return null;
   }
}
export const fetchAllNotes = async (email?:string|undefined) => {
    await Database.connect()
   try {
    let queryParam = email? {noteCreatedBy:email}:{}
       let response = await NoteModel.find(queryParam).exec();
       console.log("All Notes Fetched Successfully ✅:", response.map(i => i.toJSON()));
       return response ? response.map((i)=> ({...i.toJSON(  ),noteId:i.id})) : []
       } catch (error: any) {
       console.error("Error fetching all Notes ❌:", error);
       return null;
   }
}
export let updateNote = async (id: string, data: NoteType) => {
    await Database.connect()
    try {
       let response =  await NoteModel.updateOne(
            { _id: id },
            { $set: data }
        ).exec();
        return response ? response : null
    }catch (error: any) {
        console.error("Error updating Note ❌:", error);
        return null;
    }
}
export let deleteNote = async (id:string)=>{
    try{
        console.log("Deleting note "+ id);
       let response =  await NoteModel.deleteMany({_id:{$in:id.split(",")}}).exec();
       
       return response??null
    }catch(e){
        console.log("Failed to delete note "+ e)
    }
}