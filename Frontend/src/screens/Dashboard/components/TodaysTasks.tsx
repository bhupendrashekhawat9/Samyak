import React from 'react'
import { TASK_DATA, TaskType } from '../constants';
import { TaskCard } from './TaskCard';
import { useDashboardStore } from '../model/context';
import { updateTask, updateTaskDate } from '@controllers/tasks';
import { useTheme } from '@styles/Theme';
import { BsListTask } from 'react-icons/bs';



let todos = TASK_DATA.tasks
// Get today's date with time set to start of day
const today = new Date();
today.setHours(0, 0, 0, 0);

// Get yesterday's date
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// Get tomorrow's date for future tasks calculation
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// Filter tasks by different categories








// Task section component
const TaskSection = ({  tasks, emptyMessage }: {tasks:TaskType[], emptyMessage:string, title?:string}) => {

  let dragActions = [
    {
      title: "Completed",
      onDrop: (task) => {
        updateTask(task.taskId, {
          ...task,
          taskStatus: "Completed",
        })
      }
    },
    {
      title: "Move to Tomorrow",
      onDrop: (task) => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        updateTaskDate(task.taskId, tomorrow.toISOString())
      }
    },
  ]

  return <div className="flex flex-col gap-1 w-full ">
    {tasks.length > 0 ? (
      tasks.map(task => <TaskCard key={task.taskId} task={task} dragActions={dragActions} />)
    ) : (
      <p className="text-gray-500 text-center py-4">{emptyMessage}</p>
    )}
  </div>

}


const TodaysTasks = () => {
  let { theme } = useTheme()
  let dashboardStore = useDashboardStore();
  let todos = dashboardStore.state.tasks
  const todayTasks = todos?.filter(task => {
    const taskDate = new Date(task.taskDeadlineDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });
  let completedTasks = todayTasks?.filter(task => task.taskStatus === "Completed");
  let openTasks = todayTasks?.filter(task => task.taskStatus == "Open");
  return (

    <div className="w-full h-full">
           <div className="flex items-center mb-4">
                <BsListTask className="text-xl mr-2" style={{ color: theme["accent-color"] }} />
                <h2 className="text-xl font-semibold" style={{ color: theme["text-color"] }}>Tasks</h2>
              </div>
      <div className='h-1/3 rounded-lg '>

      <div className="flex items-center mb-4">
                
                <p className="text-xs font-bold" style={{ color: theme["text-color"] }}>Open Tasks</p>
              </div>
        <TaskSection
          title="Today's Tasks"
          tasks={openTasks}
          emptyMessage="No open tasks scheduled for today"
        />
      </div>
      <div className="flex rounded-lg flex-col mt-8 h-1/3 ">
      <div className="flex items-center mb-4">
                
                <p className="text-xs font-bold" style={{ color: theme["text-color"] }}>Completed Tasks</p>
      </div>
        <TaskSection
          title="Today's Tasks"
          tasks={completedTasks}
          emptyMessage="No tasks scheduled for today"
        />
      </div>
      {/* <div className="flex flex-col mt-8 justify-between h-1/3 items-center">
      <h2 className={`text-sm font-semibold ${theme == "dark"? "text-white":"text-black"}`}>Tomorrow's Tasks</h2>
       <TaskSection
      title="Today's Tasks"
      tasks={todayTasks}
      emptyMessage="No tasks scheduled for today"
      />
      </div> */}
    </div>



  )
}

export default TodaysTasks