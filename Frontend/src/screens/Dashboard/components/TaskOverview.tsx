import React, { useEffect, useState } from 'react';
import { TASK_DATA, TaskType } from '../constants'
import { TaskCard } from './TaskCard';
import { getTaskBGColor } from '../utilFunctions';


const groupByYear = (tasks: TaskType[]) => {
  return tasks.reduce((acc, task) => {
    const year = new Date(task.taskDeadlineDate).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(task);
    return acc;
  }, {} as Record<number, TaskType[]>);
};

const groupByMonth = (tasks: TaskType[]) => {
  return tasks.reduce((acc, task) => {
    const date = new Date(task.taskDeadlineDate);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    acc[key] = acc[key] || [];
    acc[key].push(task);
    return acc;
  }, {} as Record<string, TaskType[]>);
};
const getWeekOfMonth = (date: Date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Adjust for Monday as the first day of the week
  const offset = firstDayWeekday === 0 ? -6 : 1 - firstDayWeekday;
  const firstMonday = new Date(firstDayOfMonth);
  firstMonday.setDate(firstDayOfMonth.getDate() + offset);

  // Calculate the difference in days from the first Monday
  const diff = Math.floor((date.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24));

  // Week number calculation
  return Math.floor(diff / 7) + 1;
};


const groupByWeek = (tasks: TaskType[]) => {
  let date = new Date();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();
  let filteredTasks = tasks.filter((i) => {
    let taskDate = new Date(i.taskDeadlineDate)

    if (taskDate.getFullYear() == currentYear && taskDate.getMonth() == currentMonth) {
      return true;
    }
    return false
  })
  
  return filteredTasks.reduce((acc, task) => {
    const date = getWeekOfMonth(new Date(task.taskDeadlineDate));
    acc[date] = acc[date] || [];
    acc[date].push(task);
    return acc;
  }, {} as Record<string, TaskType[]>);
};

let groupByWeekDays = (tasks: TaskType[])=>{
  // Get current date for the weekly view
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days, otherwise calculate days until Monday
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() + mondayOffset);

  // Generate weekday headers
  const weekdays: { name: string, date: Date }[] = [];
  for (let i = 0; i < 5; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const dayName = day.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    const dayNum = day.getDate();
    weekdays.push({ name: `${dayName} ${dayNum}`, date: day });
  }
  const tasksByDay = {};
   weekdays.forEach(day => {
      tasksByDay[day.name] = [];
    });

    tasks.forEach(task => {
      const taskDate = new Date(task.taskDeadlineDate);
      const dayName = taskDate.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
      const dayNum = taskDate.getDate();
      const dayKey = `${dayName} ${dayNum}`;

      if (tasksByDay[dayKey]) {
        tasksByDay[dayKey].push(task);
      }
    });

    return [tasksByDay,weekdays];

}


let TodaysTask = ({tasks,setTasks}:{tasks:TaskType[]})=>{
  let todaysTasks = [...tasks,...tasks,...tasks];
  return <>
    {
      todaysTasks.length == 0 && <>
        <div className='flex justify-center items-center w-full h-full'>
          <img />
          <div>
            <p>
              No Tasks For Today
            </p>
          </div>
        </div>
      </>
    }
    {
      todaysTasks.length > 0 && 
      <div className='flex flex-row gap-2 h-max w-full flex-wrap'>
          {
            todaysTasks.map(task => <div className='grow-0'><TaskCard key={task.id} task={task} /></div>)
          }
      </div>
    }
  </>
}

let CurrentWeekOverview = ({tasks,setTasks}:{tasks:TaskType[]})=>{
  const [hoveredContainer, setHoveredContainer] = useState(null)
  const [tasksByDay, setTasksByDay] = useState({})
  const [weekDays, setweekDays] = useState<Object[]>([])
  const getTasksByDay = (tasks:TaskType[]) => {
    return groupByWeekDays(tasks)
  };
  let handleDragMethods = {

    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setHoveredContainer(e.currentTarget.id)
    },
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {

    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {

      let targetDate = e.currentTarget.dataset.date
      let srcTask: TaskType = JSON.parse(e.dataTransfer.getData("task"))
      setTasks(prev => {
        return prev.map((task) => {
          if (task.taskName == srcTask.taskName) {

            return {
              ...task,
              taskDeadlineDate: targetDate
            }
          }
          return task
        })
      })
    },
    onDragStart: (e: React.DragEvent<HTMLDivElement>, data: TaskType) => {
      // e.preventDefault()
      e.dataTransfer.setData("task", JSON.stringify(data))
      // e.dataTransfer.setDragImage(<img src={"/vite.svg"} />,30,30)
    },
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => {
      // e.preventDefault()
      setHoveredContainer(null)
    }
  }
  useEffect(() => {
    const [tasksByDay,weekDays] = getTasksByDay(tasks);
    setTasksByDay(tasksByDay)
    setweekDays(weekDays)

  }, [tasks])
  // User avatar component


  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    const colors = {
      'HIGH': 'bg-blue-600',
      'MEDIUM': 'bg-orange-600',
      'LOW': 'bg-green-600',
      'DONE': 'bg-gray-600'
    };

    const labels = {
      'HIGH': 'High',
      'MEDIUM': 'Medium',
      'LOW': 'Low',
      'DONE': 'Done'
    };

    return (
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${colors[priority] || 'bg-gray-600'}`}></div>
        <span className="text-xs text-gray-300">{labels[priority] || priority}</span>
      </div>
    );
  };

  // Status indicator helper



return <div className="grid grid-cols-5 h-full">
{/* Day columns */}
{weekDays.map((day, index) => (
  <div
    onDragEnter={handleDragMethods.onDragEnter}
    onDragLeave={handleDragMethods.onDragLeave}
    onDrop={handleDragMethods.onDrop}
    onDragEnd={handleDragMethods.onDragEnd}
    onDragOver={(e) => e.preventDefault()}

    data-date={day.date}
    id={day.name}
    key={day.name} className={`border-r border-gray-800 flex flex-col ${hoveredContainer == day.name ? "border-2 border-dashed border-yellow-400" : ""}`}>
    {/* Day header */}
    <div className="p-2 border-b border-gray-800 font-medium text-gray-400 text-sm">
      {day.name}
    </div>

    {/* Column content */}
    <div className="flex-1 flex flex-col divide-y divide-gray-800">
      {tasksByDay[day.name]?.map((task, taskIndex) => (
        <div
          draggable
          data-task={JSON.stringify(task)}
          onDragStart={(e)=>handleDragMethods.onDragStart(e,task)}
          key={`${day.name}-${taskIndex}`}
          className={`p-3 m-2 ${getTaskBGColor(task.taskStatus)}`}
        >
          <PriorityBadge priority={task.taskPriority} />
          <h3 className="font-medium mt-1">{task.taskName}</h3>
          <p className="text-xs text-gray-400 mt-1">{task.taskDescription}</p>
          <div className="flex items-center justify-between mt-4">

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="flex items-center">
                <span className="text-sm mr-1">⏱</span> 0h 53m
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-1">💬</span> 3
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Empty state for days with no tasks */}
      {(!tasksByDay[day.name] || tasksByDay[day.name].length === 0) && (
        <div className="p-3 m-2 bg-gray-900 flex items-center justify-center text-gray-500 text-sm h-32">
          No tasks scheduled
        </div>
      )}

      {/* Add a "Brake time" slot for each day as in original */}

    </div>
  </div>
))}
</div>
}

const TaskOverview = () => {
  const [timeFilter, setTimeFilter] = useState('Week');
  
  // Sample task data based on provided structure
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      "taskName": "Complete Monthly Report",
      "taskDescription": "Prepare and finalize the monthly financial report.",
      "taskStatus": "Open",
      "taskDeadlineDate": "2025-04-01",
      "taskCreatedDate": "2025-04-01",
      "taskCreatedBy": "Bhupendra Shekawat",
      "taskPriority": "HIGH",
      "taskParentRefId": "",
      "taskAttachments": null,
      "taskCategory": "WORK",
      "taskCompletionDuration":0
    },
    {
      "taskName": "Design Brief Review",
      "taskDescription": "Review project goals and objectives",
      "taskStatus": "Done",
      "taskDeadlineDate": "2025-04-01",
      "taskCreatedDate": "2025-03-28",
      "taskCreatedBy": "John Doe",
      "taskPriority": "MEDIUM",
      "taskParentRefId": "",
      "taskAttachments": null,
      "taskCategory": "WORK",
      "taskCompletionDuration":0

    },
    {
      "taskName": "Typography & Layout Design",
      "taskDescription": "Help with choose fonts and layout elements for the design",
      "taskStatus": "In Progress",
      "taskDeadlineDate": "2025-04-02",
      "taskCreatedDate": "2025-03-29",
      "taskCreatedBy": "Jane Smith",
      "taskPriority": "MEDIUM",
      "taskParentRefId": "",
      "taskAttachments": null,
      "taskCategory": "WORK",
      "taskCompletionDuration":0

    },
    {
      "taskName": "Color Palette Selection",
      "taskDescription": "Create a harmonious color scheme",
      "taskStatus": "In Progress",
      "taskDeadlineDate": "2025-04-03",
      "taskCreatedDate": "2025-03-30",
      "taskCreatedBy": "Alex Johnson",
      "taskPriority": "MEDIUM",
      "taskParentRefId": "",
      "taskAttachments": null,
      "taskCategory": "WORK",
      "taskCompletionDuration":0

    },
  
  ])
 



  return (
    <div className="bg-black text-white h-5/8 p-4 rounded-2xl mt-8 mr-4">
      {/* Header section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <button className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-md text-sm">
            <span className="text-lg">⚙</span> Filter
          </button>
        </div>

        <div className="flex bg-gray-900 rounded-full overflow-hidden">
          {['Today', 'Week', 'Month', 'Year'].map(filter => (
            <button
              key={filter}
              className={`px-4 py-1 text-sm ${timeFilter === filter ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              onClick={() => setTimeFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className='h-full overflow-auto'>

      {timeFilter == "Week" && <CurrentWeekOverview tasks={tasks} setTasks={setTasks} />}
      {
        timeFilter == "Today" && <TodaysTask tasks={tasks} setTasks={setTasks}/>
      }
      </div>

    </div>
  );
};

export default TaskOverview;