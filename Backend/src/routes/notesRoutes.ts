import express  from 'express';
import { handleCreateNote, handleDeleteNote, handleGetAllNotes, handleGetNoteByRefId, handleUpdateNote } from '../controllers/notesController.js';
let route = express.Router();


route.get('/getAllNotes', handleGetAllNotes);
route.post('/saveNote', handleCreateNote);
route.post('/updateNote', handleUpdateNote);
route.post('/deleteNote', handleDeleteNote);
// route.get('/getSingleNote', handleGetNoteByRefId);
route.get('/getNotesByRefId', handleGetNoteByRefId);
// route.post('/updateTaskDate', handleUpdateTaskDate);

export default route;
