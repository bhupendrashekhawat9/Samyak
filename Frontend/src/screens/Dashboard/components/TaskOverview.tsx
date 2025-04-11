import React, { useEffect, useState } from 'react';
import { TASK_DATA, TaskType } from '../constants'
import { CreateTaskCard, TaskCard } from './TaskCard';
import { formatSeconds, getTaskBGColor, groupByWeekDays } from '../utilFunctions';
import { useDashboardStore } from '../model/context';
import { updateTaskDate, updateTaskStatus } from '../../../controllers/tasks';
import { useTheme } from '@styles/Theme';
import { GiEmptyHourglass } from 'react-icons/gi';



let Today = () => {
  let dashboardStore = useDashboardStore();
  let todaysTasks = dashboardStore.state.tasks.filter((task) => {
    let taskDate = new Date(task.taskDeadlineDate)
    let today = new Date();
    if (taskDate.getFullYear() == today.getFullYear() && taskDate.getMonth() == today.getMonth() && taskDate.getDate() == today.getDate()) {
      return true;
    }
    return false
  })

  let dragActions = [
    {
      title: "Start working",
      onDrop: (task) => {
        try{

          dashboardStore.methods.setTasks((prev)=> {
            return prev?.map((i)=>{
              if(i.taskId == task.taskId){
                return {
                  ...i,
                  taskStatus:"In Progress"
                }
              }
              return i
            })
          })
          updateTaskStatus(task.taskId, "In Progress")
          return true
        }catch(e){
          console.log(e)
        }
      }
    },
    {
      title: "Move this for tomorrow",
      onDrop: (task) => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        updateTaskDate(task.taskId, tomorrow.toISOString())
        dashboardStore.methods.updateTask({
          ...task,
          taskDeadlineDate: tomorrow.toISOString()
        })
        return false
      }
    },
  
    {
      title: "I have completed the task!!",
      onDrop: (task) => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        updateTaskDate(task.taskId, tomorrow.toISOString())
        dashboardStore.methods.updateTask({
          ...task,
          taskDeadlineDate: tomorrow.toISOString()
        })
        return false
      }
    },
  ]
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
      <div>
        <div className='w-3/12 my-4' >

        <CreateTaskCard />
        </div>
      <div className='grid grid-cols-4 gap-2 h-max  w-full '>
        {
          todaysTasks.map(task => <div className='grow-0' draggable><TaskCard key={task.taskId} task={task} dragActions={dragActions} /></div>)
        }
      </div>
      </div>

    }
  </>
}

let Week = () => {
  let {theme} = useTheme();
  let dashboardStore = useDashboardStore();
  let tasks = dashboardStore.state.tasks
  const [hoveredContainer, setHoveredContainer] = useState(null)
  const [tasksByDay, setTasksByDay] = useState<{[key:string]:TaskType[]}>({})
  const [weekDays, setweekDays] = useState<Object[]>([])
  const getTasksByDay = (tasks: TaskType[]) => {
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
      dashboardStore.methods.setTasks((prev)=>(prev.map((task) => {
        if (task.taskId == srcTask.taskId) {

          return {
            ...task,
            taskDeadlineDate: targetDate
          }
        }
        return task
      })));
      updateTaskDate(srcTask.taskId, new Date(targetDate).toISOString())
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

    const [tasksByDay, weekDays] = getTasksByDay(tasks);
    setTasksByDay(tasksByDay)
    setweekDays(weekDays)
  }, [tasks])

  // User avatar component


  // Priority badge component
  const PriorityBadge = ({ priority }:{priority:string}) => {
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
        key={day.name} 
        className={`h-full  flex flex-col ${hoveredContainer == day.name ? "bg-white/30" : ""}`}>
        {/* Day header */}
        <div className="p-2 relative  text-black font-bold text-sm">
          
          {day.name}
     
        </div>
        {/* Column content */}
        <div className=" overflow-auto h-90/100 ">
          <div className='max-h-max'>

          {tasksByDay[day.name]?.map((task, taskIndex) => (
            <div
              draggable
              data-task={JSON.stringify(task)}
              onDragStart={(e) => handleDragMethods.onDragStart(e, task)}
              key={`${day.name}-${taskIndex}`}
              className={`rounded-lg p-3 m-2 ${getTaskBGColor(task.taskPriority)}`}
            >
              <PriorityBadge priority={task.taskPriority} />
              <h3 className="font-medium mt-1">{task.taskName}</h3>
              <p className="text-xs text-gray-400 mt-1">{task.taskDescription}</p>
              <div className="flex items-center justify-between mt-4">

                <div className="flex items-center gap-2 text-xs" style={{
                  color:theme["text-color"]
                }}>
                  <div className="flex items-center">
                    <span className="text-sm mr-1">⏱</span> {formatSeconds(task.taskTimeSpentInSeconds as number)??"Not Started"}
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
            <div className="p-3 m-2 rounded-lg  flex flex-col items-center justify-center  text-sm h-32" style={{
              backgroundColor:theme["bg-layer-2"],
              color:theme["text-color"]
            }}>
             <GiEmptyHourglass className='mb-2 text-lg leftRightShake'/> 
             
             <div>
               No tasks scheduled
               </div>
            </div>
          )}

          {/* Add a "Brake time" slot for each day as in original */}
</div>
        </div>
      </div>
    ))}
  </div>
}




const TaskOverview = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  return (
    <div className="bg-white/30 backdrop-blur-xs text-white h-6/8 overflow-hidden p-4 rounded-2xl mt-8 mr-4">
      {/* Header section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          {/* <h1 className="text-2xl font-semibold"></h1> */}
          {/* <button className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-md text-sm"> */}
          <span className="text-lg">⚙</span> Filter
          {/* </button> */}
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
      <div className='h-90/100 overflow-hidden'>

        {timeFilter == "Week" && <Week />}
        {
          timeFilter == "Today" && <Today  />
        }
      </div>

    </div>
  );
};

export default TaskOverview;