import React, { useEffect, useState } from 'react'
import { TASK_DATA, TaskType } from '../constants'
import { useDashboardStore } from '../model/context'
import { TaskCard } from './TaskCard';
import { TaskDragActionContextProps, useTaskDragAction } from '@components/TaskDragAction';
import { formatDate, getPriorityColor, getStatusColor } from '../utilFunctions';
import { FaPlay, FaPause } from "react-icons/fa";

const ViewTask = ({task}:{task:TaskType}) => {
  let taskDragAction = useTaskDragAction() as TaskDragActionContextProps
  let handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    taskDragAction.methods.open()
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setDragImage(e.currentTarget, 0, 0)
    e.dataTransfer.setData("task", JSON.stringify(task))
  }
  let handleDragEnd = (e) => {
    taskDragAction.methods.close()

  }
  return <div draggable onDragEnd={handleDragEnd} onDragStart={handleDragStart} className="ml-8 rounded-md   p-4  w-full mr-4 h-auto bg-neutral-600">
    <div className="flex justify-between flex-col gap-10 w-full">
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{task.taskName}</h3>
        <p className="text-sm font-light text-gray-600 mb-2"> {task.taskDescription}</p>

        {/* <p className="text-sm text-gray-600">Created by: {task.taskCreatedBy}</p> */}
        <p className="text-xs text-gray-600 ">Due: {formatDate(task.taskDeadlineDate)}</p>
      </div>
      <div className="flex flex-row justify-start gap-2 mt-auto">
        <span className={` lowercase inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getPriorityColor(task.taskPriority)}`}>
          {task.taskPriority}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.taskStatus)}`}>
          {task.taskStatus}
        </span>
      </div>
    </div>
  </div>
}

const Timer = () => {
  let dashboardStore = useDashboardStore();

  const [time, setTime] = useState(1); // 57 minutes and 56 seconds
  const [isRunning, setIsRunning] = useState(true);
  
let currentTask = dashboardStore.state.currentWorkingTask;
  useEffect(()=>{
    if(currentTask){
      setIsRunning(true)
      setTime(1)
    }else{
      setIsRunning(false);
      setTime(0)
    }
  },[currentTask])
  useEffect(() => {
   
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="bg-black w-full p-6 h-full  text-white">
      <div className="flex flex-col items-center gap-8">
              
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-xs mb-1">Time taken</p>
            <p className="text-white font-bold">{formatTime(time)}</p>
          </div>
          
         

        <button 
          onClick={toggleTimer}
          className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mb-8"
        >
          {/* Pause icon created with pure CSS */}
         { isRunning && <FaPause/>}
         {!isRunning && <FaPlay/>}
        </button>
      </div>
    </div>
  );
};


const TaskCountDown = () => {
  let dashboardStore = useDashboardStore();


  let task: TaskType = dashboardStore.state.currentWorkingTask
  const [timer, setTimer] = useState(0)

  
  return (
    <>
     {/* <div className='p-4'>
        <p>
          You are working on ({1}) task
        </p>
      </div> */}
    <div className='flex flex-row bg-neutral-900 mr-4 rounded-r-lg'>
      
      <div className='card h-60 w-60 rounded-lg overflow-hidden'>
      <Timer/>
      </div>
      {task && <ViewTask task={task} />}
    </div>
    </>

  )
}

export default TaskCountDown