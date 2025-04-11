import React, { useEffect, useState } from 'react'
import { TaskType } from '../constants'
import { useDashboardStore } from '../model/context'
import { TaskDragActionContextProps, useTaskDragAction } from '@components/TaskDragAction';
import { formatDate, getPriorityColor, getStatusColor } from '../utilFunctions';
import { FaPlay, FaPause } from "react-icons/fa";
import { deleteTask, updateTask, updateTaskDate, updateTaskStatus } from '../../../controllers/tasks';
import { useTheme } from '@styles/Theme';
import { FiDelete } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';


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
  
  let handleDragEnd = (e) => {
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
            taskTimeSpent: timer + 1
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
  console.log(theme,"theme")
  
  return (
    <div 
      draggable 
      onDragEnd={handleDragEnd} 
      onDragStart={handleDragStart} 
      className={`ml-2 rounded-lg p-4 w-full flex flex-col justify-between h-auto `}
      style={{
        backgroundColor:theme["bg-layer-2"]
      }}
    >
      <div className={`flex justify-between flex-row gap-10 w-full `}>

        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${theme["bg-layer-1"]} ${theme["text-color"]}`}>
            {task.taskName}
          </h3>
          <p className={`text-sm font-light mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {task.taskDescription}
          </p>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
        <div className='button text-sm' onClick={handleOpenNotes}>
           {dashboardStore.state.isNotesVisible ? "Close Notes" : "View Notes"}
          </div>
      <div className='flex flex-row justify-start  items-center mt-8'>
        <div onClick={handleMarkTaskComplete} className='button mr-2'>
        
            Complete
          
        </div>
        <div className='button' onClick={handleDeleteTask}>
          <MdDelete className='text-red-800 text-lg'/>
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
    <div className={`p-6 h-full w-full flex flex-col items-center ${theme["bg-layer-3"]} ${theme["text-color"]}`}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <p className={`text-xs mb-1 ${theme["bg-layer-1"]} ${theme["text-color-dark"]} font-bold`}>Time taken</p>
          <p className={`font-bold ${theme["bg-layer-3"]} ${theme["text-color"]}`}>{formatTime(timer)}</p>
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
    <div className={`flex flex-col ${theme["text-color"]} ${theme["bg-layer-1"]} rounded-lg  h-full w-full`}>
      {task && (
        <div className={`flex flex-row  rounded-lg mr-4`}>
          <div className='card h-60 w-60 rounded-lg overflow-hidden'>
            <Timer timer={timer} setTimer={setTimer} />
          </div>
          <ViewTask task={task} timer={timer} />
        </div>
      )}
      {!task && (
        <div className={`p-4 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          No task currently selected
        </div>
      )}
    </div>
  );
};

export default WorkingTask;