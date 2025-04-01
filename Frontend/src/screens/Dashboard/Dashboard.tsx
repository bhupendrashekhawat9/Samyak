import { PAGE_TITLE, TaskType } from "./constants"
import { useEffect, useState } from "react";
import { useTaskDragAction } from "@components/TaskDragAction";
import { FcAddImage } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import TaskCountDown from "./components/TaskCountDown";
import TaskOverview from "./components/TaskOverview";
import TodaysTasks from "./components/TodaysTasks";
import { useDashboardStore } from "./model/context";
import { TaskDragActionContextProps } from "components/TaskDragAction";


const Dashboard = () => {
  let dashboardStore = useDashboardStore();
  let taskDragAction = useTaskDragAction() as TaskDragActionContextProps;

  let todos = dashboardStore.state.tasks
  let currentWorkingTask = taskDragAction.state.draggedTask as TaskType
  useEffect(() => {
    if (currentWorkingTask) {
      dashboardStore.methods.updateActiveTask(currentWorkingTask)
    }
  }, [currentWorkingTask])

  return (
    <div className=' min-h-screen p-4'>

      <div className="flex flex-row h-screen">

        <div className="w-8/10">
          <p className="text-white text-2xl font-medium my-10 ml-8">
            {PAGE_TITLE}
          </p>
          {/* SUMMARY CARD */}
          <div>
            <TaskCountDown />
          </div>





          <TaskOverview />



        </div>

        <div className="w-2/10 h-5/5 overflow-auto">
          <TodaysTasks />
        </div>
      </div>
    </div>


  )
}

export const DashboardActionElement = () => {
  let navigate = useNavigate();
  let handleOpenCreateTask = () => {
    navigate("/createTask")
  }
  return <>
    <div className="button" onClick={handleOpenCreateTask}>
      <FcAddImage />
    </div>
  </>
}

export default Dashboard