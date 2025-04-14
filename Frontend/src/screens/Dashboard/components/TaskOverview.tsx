import React, { useEffect, useMemo, useState } from 'react';
import { TaskType } from '../constants'
import { CreateTaskCard, TaskCard } from './TaskCard';
import { formatSeconds, getSelectedWeek, getTaskBGColor, getWeekDays, groupByWeekDays } from '../utilFunctions';
import { useDashboardStore } from '../model/context';
import { updateTaskDate, updateTaskStatus } from '../../../controllers/tasks';
import { useTheme } from '@styles/Theme';
import { Calender } from '@components/Calender';
import moment from 'moment';



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
        try {

          dashboardStore.methods.setTasks((prev) => {
            return prev?.map((i) => {
              if (i.taskId == task.taskId) {
                return {
                  ...i,
                  taskStatus: "In Progress"
                }
              }
              return i
            })
          })
          updateTaskStatus(task.taskId, "In Progress")
          return true
        } catch (e) {
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
            <CreateTaskCard task={{taskDeadlineDate:new Date().toISOString()}} onClickAddTask={() => {}} />
          </div>
        </div>
      </>
    }
    {
      todaysTasks.length > 0 &&
      <div>
        <div className='w-3/12 my-4' >

          <CreateTaskCard task={{taskDeadlineDate:new Date().toISOString()}} onClickAddTask={() => {}} />
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

type WeekDaysType = { name: string, date: Date }

let Week = ({ filter }: { filter: { startDate: Date, endDate: Date } }) => {
  let { theme } = useTheme();
  let dashboardStore = useDashboardStore();

  let tasks = useMemo(() => dashboardStore.state.tasks.filter((task) => {
   
    let taskDate = moment(task.taskDeadlineDate)
    if (taskDate.isSameOrAfter(moment(filter.startDate)) && taskDate.isSameOrBefore(moment(filter.endDate))) {
      return true
    }
  }), [filter, dashboardStore.state.tasks])
const [addTask, setAddTask] = useState<TaskType|null>(null)
  const [hoveredContainer, setHoveredContainer] = useState<string | null>(null)
  const [tasksByDay, setTasksByDay] = useState<{ [key: string]: TaskType[] }>({})
  const [weekDays, setweekDays] = useState<WeekDaysType[]>([])
  const getTasksByDay = (tasks: TaskType[]) => {
    return groupByWeekDays(tasks, filter.startDate, filter.endDate)
  };

  let handleDragMethods = {

    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setHoveredContainer(e.currentTarget.id)
    },
    onDragLeave: () => {

    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {

      let targetDate = e.currentTarget.dataset.date
      let srcTask: TaskType = JSON.parse(e.dataTransfer.getData("task"))
      dashboardStore.methods.setTasks((prev) => (prev.map((task) => {
        if (task.taskId == srcTask.taskId) {

          return {
            ...task,
            taskDeadlineDate: targetDate
          }
        }
        return task
      })));
      updateTaskDate(srcTask.taskId as string, new Date(targetDate).toISOString())
    },
    onDragStart: (e: React.DragEvent<HTMLDivElement>, data: TaskType) => {
      // e.preventDefault()
      e.dataTransfer.setData("task", JSON.stringify(data))
      // e.dataTransfer.setDragImage(<img src={"/vite.svg"} />,30,30)
    },
    onDragEnd: () => {
      // e.preventDefault()
      setHoveredContainer(null)
    }
  }
  useEffect(() => {
    let weekDays: WeekDaysType[] = getWeekDays(filter.startDate, filter.endDate)
    const [tasksByDay] = getTasksByDay(tasks);
    setTasksByDay(tasksByDay)
    setweekDays(weekDays)
  }, [tasks])

  // User avatar component


  // Priority badge component
  const PriorityBadge = ({ priority }: { priority: string }) => {
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
  let handleAddNewTask = (date:Date)=>{
    setAddTask({taskDeadlineDate:date.toISOString()})
  }


 return <div className="w-full h-full overflow-x-auto overflow-y-hidden">
  <div className="grid gap-1 grid-cols-[repeat(7,20rem)] min-w-max h-full">
    {weekDays.map((day) => (
      <div
        onDragEnter={handleDragMethods.onDragEnter}
        onDragLeave={handleDragMethods.onDragLeave}
        onDrop={handleDragMethods.onDrop}
        onDragEnd={handleDragMethods.onDragEnd}
        onDragOver={(e) => e.preventDefault()}
        data-date={day.date}
        id={day.name}
        key={day.name}
        className={`h-full flex flex-col ${hoveredContainer === day.name ? "bg-white/30" : ""}`}
      >
        {/* Header */}
        <div className="p-2 text-black font-bold text-sm">{day.name}</div>
      <div className='h-8/10 overflow-auto'>

        {/* Create Task Section */}
        <div className="max-h-max">
          <CreateTaskCard task={addTask} onClickAddTask={() => handleAddNewTask(day.date)} />
        </div>

        {/* Tasks */}
        <div className="overflow-y-auto grow min-h-0">
          {tasksByDay[day.name]?.map((task, taskIndex) => (
            <div
              draggable
              data-task={JSON.stringify(task)}
              onDragStart={(e) => handleDragMethods.onDragStart(e, task)}
              key={`${day.name}-${taskIndex}`}
              className="rounded-lg h-40 mt-1 bg-black/80 flex flex-row overflow-hidden"
            >
              <div className={`w-3 h-full ${getTaskBGColor(task.taskPriority)}`} />
              <div className="p-2">
                <PriorityBadge priority={task.taskPriority} />
                <h3 className="font-medium mt-1">{task.taskName}</h3>
                <p className="text-xs text-gray-400 mt-1">{task.taskDescription}</p>
                <div className="flex items-center justify-between mt-4 text-xs text-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-sm mr-1">⏱</span>
                      {formatSeconds(task.taskTimeSpentInSeconds as number) ?? "Not Started"}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-1">💬</span>3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    ))}
  </div>
</div>

}




const TaskOverview = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const [weekFilter, setWeekFilter] = useState({ startDate: new Date(), endDate: new Date() })
  let handleWeekChange = (obj: { startDate: Date, endDate: Date }) => {
    setWeekFilter(obj)

  }
  useEffect(() => {
    setWeekFilter(getSelectedWeek(new Date()))
  }, [])
  let getDateSpan = (ref)=>{
    if(ref == "Today"){
      return 1
    }
    if(ref == "Week"){
      return 7
    }
    return 31
  }
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
          
          {['Today', 'Week'].map(filter => (
            <>
            <button
              key={filter}
              className={`flex flex-row justify-center items-center px-4 py-1 text-sm ${timeFilter === filter ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              onClick={() => setTimeFilter(filter)}
              >
              {timeFilter == "Week"&& filter == "Week" && <Calender onClick={handleWeekChange} value={weekFilter} span={getDateSpan(timeFilter)} />}
              <p className='ml-2'>{filter}</p>
            </button>
              </>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className='h-90/100 overflow-hidden'>

        {timeFilter == "Week" && <Week filter={weekFilter} />}
        {
          timeFilter == "Today" && <Today />
        }
      </div>

    </div>
  );
};

export default TaskOverview;