
import type { Request, Response } from "express";
import { saveTask, fetchAllTasks, getSingleTask, updateTask, deleteTask } from "../database/models/TasksModel.js";
import type { TaskType } from "../types/tasks.js";

import { fetchAllNotes, getNotesByRefId } from "../database/models/NotesModel.js";
import { NoteType, saveNote } from "../database/models/NotesModel.js";

let notesResponse = (data: Object) => {
    return {
        status: 200,
        message: "Note Created Successfully",
        data: data,
    }
}

export async function handleGetNoteByRefId(req: Request, res: Response) {
    let id = req.query.id as string;
    try {
        let notes = await getNotesByRefId(id)

        if (notes) {
            res.status(200).json({
                status: 200,
                message: "Notes Fetched Successfully",
                data: {
                    noteBody: JSON.parse(notes.noteBody),
                    noteRefId: notes.noteRefId,
                    noteCreatedBy: notes.noteCreatedBy,
                    noteCreatedAt: notes.noteCreatedAt
                },
            })
        } else {
            res.status(500).json({
                status: 500,
                message: "No Notes Found",
                data: null,
            })
        }
    } catch (error) {
        console.error("Error Fetching All Notes ❌:", error);
        res.status(500).json({
            status: 500,
            message: "Error Fetching All Notes",
            data: null,
        })
    }
}
export async function handleGetAllNotes(req: Request, res: Response) {

    try {
        let user = req.user;
        let tasks = await fetchAllNotes(user.userEmail)
        res.status(200).json({
            status: 200,
            message: "All Notes Fetched Successfully",
            data: tasks,
        })
        console.log("All Notes Fetched Successfully ✅:", user.userEmail);
    } catch (error) {
        console.error("Error Fetching All Notes ❌:", error);
        res.status(500).json({
            status: 500,
            message: "Error Fetching All Notes",
            data: null,
        })
    }
}
export async function handleCreateNote(req: Request, res: Response) {

    let data = req.body as NoteType;
    let user = req.user
    try {
        let noteData = {
            noteBody: JSON.stringify(data.noteBody),
            noteRefId: data.noteRefId,
            noteCreatedBy: user.userEmail,
            noteCreatedAt: new Date().toISOString()
        }
        let response = await saveNote(noteData);
        res.status(200).json(notesResponse(response));
    } catch (error) {
        console.error("Error Creating Note ❌:", error);
    }
    console.log("Note Created Successfully ✅:");

}
export async function handleUpdateNote(req: Request, res: Response) {

    let data = req.body as TaskType;
    let id = req.query.id as string;
    let user = req.user;
    try {
        console.log("Updating Task");

        let response = await updateTask(id, {
            ...data
        });
        if (response) {
            res.status(200).json(taskResponse(response));
        } else {
            res.status(500).json(taskResponse({}));
        }
    } catch (error) {
        res.status(500).json(taskResponse({ message: error.message, status: 500 }));
        console.error("Error Updating Task ❌:", error);
    }
    console.log("Task Updated Successfully ✅:");

}

export async function handleDeleteNote(req: Request, res: Response) {
    try {

        let { id } = req.query;
        let response = await deleteTask(id as string);
        if (response) {
            res.status(200).json({ message: "Task Deleted SUccessfully", code: 1 })
            return;
        }
        res.status(500).json({ message: "Task Delete Failed", code: 1 })

    } catch (e) {
        res.status(500).json({ message: "Task Delete failed", code: 0 })

    }
}