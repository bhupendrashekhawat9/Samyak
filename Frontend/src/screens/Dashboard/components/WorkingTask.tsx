import React, { useEffect, useState } from 'react'
import { TaskType } from '../constants'
import { useDashboardStore } from '../model/context'
import { TaskDragActionContextProps, useTaskDragAction } from '@contextProviders/TaskDragAction';
import { formatDate, getPriorityColor, getStatusColor } from '../utilFunctions';
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { deleteTask, updateTask, updateTaskDate, updateTaskStatus } from '../../../controllers/tasks';
import { useTheme } from '@styles/Theme';
import { FiDelete } from 'react-icons/fi';
import { MdDelete, MdNotes } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';


const ViewTask = ({task, timer}: {task: TaskType, timer: number}) => {
  const { theme } = useTheme(); // Get current theme
  let taskDragAction = useTaskDragAction() as TaskDragActionContextProps
  let dashboardStore = useDashboardStore();
  let handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    taskDragAction.methods.open()
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setDragImage(e.currentTarget, 0, 0)
    e.dataTransfer.setData("task", JSON.stringify(task))
  }
  
  let handleDragEnd = () => {
    taskDragAction.methods.close()
  }
  
  useEffect(() => {
    taskDragAction.methods.setDragActions([
      {
        title: "Completed",
        onDrop: (task) => {
          updateTask(task.taskId, {
            ...task,
            taskStatus: "Completed",
            taskTimeSpentInSeconds: timer + 1
          })
          taskDragAction.methods.close()
        }
      },
      {
        title: "Set To Open",
        onDrop: (task) => {
          updateTaskStatus(task.taskId, "Open")
          taskDragAction.methods.close()
        }
      }
    ])
  }, [])
  let handleDeleteTask = () => {
    dashboardStore.methods.setCurrentTask(null)
    dashboardStore.methods.deleteTask(task)
    deleteTask(task.taskId as string)
  }
  let handleMarkTaskComplete = () => {
    let updatedTask: TaskType = {
      ...task,
      taskStatus: "Completed",
      taskTimeSpentInSeconds: timer + 1
    }
    taskDragAction.methods.close()
    dashboardStore.methods.updateTask(updatedTask)
    updateTask(task.taskId as string, {
      taskStatus: "Completed",
      taskTimeSpentInSeconds: timer + 1
    })
  }
  let handleOpenNotes = () => {
    if(dashboardStore.state.isNotesVisible) {
      dashboardStore.methods.closeTaskNotes()
      return
    }
    dashboardStore.methods.openTaskNotes()
  }
  
  let handleContinueLater = () => {
    
    dashboardStore.methods.setCurrentTask(null)
  }
  return (
    <div 
      draggable 
      onDragEnd={handleDragEnd} 
      onDragStart={handleDragStart} 
      className={`ml-2 rounded-lg p-4 w-full flex flex-col justify-between h-auto ${theme["layer-3"]} `}
     
    >
      <div className={`flex justify-between flex-row gap-10 w-full `}>

        <div className="flex-1">
          <h3 className={`font-semibold text-xl capitalize rounded-lg w-max text-black`}>
            {task.taskName}
          </h3>
          <p className={`text-sm  mb-2 text-neutral-800 font-bold`}>
            {task.taskDescription}
          </p>
          <p className={`text-xs`}>
            Due: {formatDate(task.taskDeadlineDate)}
          </p>
        </div>
        <div className="flex flex-row justify-start gap-2 mt-auto">
          <span className={`lowercase inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getPriorityColor(task.taskPriority)}`}>
            {task.taskPriority}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.taskStatus)}`}>
            {task.taskStatus}
          </span>
        </div>
      </div>
      <div className='flex flex-row justify-between h-max items-end'>

      <div className='flex flex-row justify-start  items-center mt-8'>
        <div onClick={handleMarkTaskComplete} className=' hover:bg-white/30 cursor-pointer mr-2 flex flex-row items-center gap-2 font-medium text-sm text-black border-1 border-green-800 rounded-lg px-2'>
          <TiTick/>
            <p>I have completed this task</p>
          
        </div>
        <div onClick={handleContinueLater} className=' hover:bg-white/30 cursor-pointer mr-2 flex flex-row items-center gap-2 font-medium text-sm text-black border-1 border-green-800 rounded-lg px-2'>
          <FaStop/>
            <p>Continue later</p>
          
        </div>
        <div className=' hover:bg-white/30 cursor-pointer flex flex-row items-center gap-2 font-medium text-sm text-black border-1 border-red-800 rounded-lg px-2  h-max' onClick={handleDeleteTask}>
          <MdDelete className='text-red-800 text-sm'/>
          <p>Delete</p>
          </div>
      </div>
      <div className='mr-2 h-max flex flex-row items-center gap-2 font-medium text-sm text-black hover:bg-white/30 cursor-pointer w-max rounded-lg px-2 py-1' onClick={handleOpenNotes}>
          <MdNotes/>
           {dashboardStore.state.isNotesVisible ? "Close Notes" : "View/Edit Notes"}
      </div>
      </div>

    </div>
  )
}

const Timer = ({timer, setTimer}: {timer: number, setTimer: any}) => {
  const { theme } = useTheme(); // Get current theme
  let dashboardStore = useDashboardStore();
  const [isRunning, setIsRunning] = useState(true);
  
  let currentTask: TaskType = dashboardStore.state.currentWorkingTask as TaskType;
  
  useEffect(() => {
    if(currentTask) {
      setIsRunning(false)
      setTimer(() => currentTask.taskTimeSpentInSeconds ?? 1)
    } else {
      setIsRunning(false);
      setTimer(0)
    }
  }, [currentTask, setTimer])
  
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, setTimer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);

    if(isRunning && currentTask?.taskId) {
      updateTask(currentTask.taskId, {taskTimeSpentInSeconds: timer})
    }
  };

  return (
    <div className={`p-6 h-full w-full flex flex-col items-center bg-white/20`}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <p className={`text-xs mb-1  font-bold`}>Time taken</p>
          <p className={`font-bold `}>{formatTime(timer)}</p>
        </div>
        
        <button 
          onClick={toggleTimer}
          className="bg-red-600 hover:bg-red-700 w-20 h-20 rounded-full flex items-center justify-center mb-8 text-white"
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );  
};

const WorkingTask = () => {
  const { theme } = useTheme(); // Get current theme
  let dashboardStore = useDashboardStore();
  let task: TaskType = dashboardStore.state.currentWorkingTask;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (task) {
      setTimer(task.taskTimeSpentInSeconds ?? 0);
    }
  }, [task]);

  return (
    <div className={`flex flex-col  rounded-lg  h-full w-full `}>
      {task && (
        <div className={`grid grid-cols-[1fr_6fr] bg-white/30 rounded-lg `}>
          
            <Timer timer={timer} setTimer={setTimer} />
       
          <ViewTask task={task} timer={timer} />
        </div>
      )}
      {!task && (
        <div className={`p-4 text-center `} style= {{color: theme["text-color"]}}>
          No task currently selected
        </div>
      )}
    </div>
  );
};

export default WorkingTask;