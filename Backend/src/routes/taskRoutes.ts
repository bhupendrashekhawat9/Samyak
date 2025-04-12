import express  from 'express';
import { handleCreateTask, handleDEleteTask, handleGetAllTasks, handleGetTaskById, handleUpdateTask, handleUpdateTaskDate } from '../controllers/tasksController.js';
let route = express.Router();





route.get('/getAllTasks', handleGetAllTasks);
route.post('/createTask', handleCreateTask);
route.post('/updateTask', handleUpdateTask);
route.post('/deleteTask', handleDEleteTask);
route.get('/details', handleGetTaskById);
route.post('/updateTaskDate', handleUpdateTaskDate);

export default route;
