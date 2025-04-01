import React from 'react'
import { TASK_DATA } from '../constants';
import { useTaskDragAction } from '@components/TaskDragAction';
import { TaskCard } from './TaskCard';



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




const todayTasks = todos.filter(task => {
  const taskDate = new Date(task.taskDeadlineDate);
  taskDate.setHours(0, 0, 0, 0);
  return taskDate.getTime() === today.getTime();
});

  
  
  // Task section component
  const TaskSection = ({ title, tasks, emptyMessage }) => (
   

      <div className="flex flex-col gap-1 w-full ">
        {tasks.length > 0 ? (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-gray-500 text-center py-4">{emptyMessage}</p>
        )}
      </div>
   
  );
  
const TodaysTasks = () => {
  return (
    <div>


  <div className="w-full">
     {/* <TaskSection
      title="Today's Tasks"
      tasks={todayTasks}
      emptyMessage="No tasks scheduled for today"
    /> */}
  </div>


    </div>
  )
}

export default TodaysTasks