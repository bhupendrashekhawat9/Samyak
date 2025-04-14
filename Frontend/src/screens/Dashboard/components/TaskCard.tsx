import { TaskDragAction, useTaskDragAction } from "@components/TaskDragAction";
import { TaskDragActionContextProps } from "@components/TaskDragAction";
import { formatSeconds, getTaskBGColor } from "../utilFunctions";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { MdCancel, MdDelete } from "react-icons/md";
import { TaskType } from "../constants";
import { createTask, deleteTask, updateTask } from "../../../controllers/tasks";
import { useDashboardStore } from "../model/context";
import { useTheme } from "../../../styles/Theme"; // Import the useTheme hook
import { Dialog, DialogContent } from "@mui/material";


const PriorityBadge = ({ priority }) => {
  const colors = {
    HIGH: "bg-blue-600",
    MEDIUM: "bg-orange-600",
    LOW: "bg-green-600",
    DONE: "bg-gray-600",
  };

  const labels = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
    DONE: "Done",
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${colors[priority] || "bg-gray-600"}`}></div>
      <span className="text-xs text-gray-300">{labels[priority] || priority}</span>
    </div>
  );
};

interface TaskCardProps {
  task: TaskType;
  dragActions?: TaskDragAction[];
}

export const TaskCard = ({ task, dragActions }: TaskCardProps) => {
  const { theme } = useTheme(); // Access the theme from the ThemeContext
  let taskDragAction = useTaskDragAction() as TaskDragActionContextProps;
  let dashboardStore = useDashboardStore();

  let handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    taskDragAction.methods.setDragActions(dragActions);
    taskDragAction.methods.open();
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  let handleDragEnd = () => {
    taskDragAction.methods.close();
  };

  let handleDeleteTask = () => {
    dashboardStore.methods.deleteTask(task);
    deleteTask(task.taskId as string);
  };

  return (
    <div
      draggable
      data-task={JSON.stringify(task)}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={handleDragEnd}
      className={`relative hover:cursor-pointer rounded-lg w-full min-w-60 bg-black/80 overflow-hidden flex flex-row`}
      style={{
        // backgroundColor: theme["card-bg-color"], // Apply theme card background color
        color: theme["card-text-color"], // Apply theme card text color
        border: `1px solid ${theme["card-border-color"]}`, // Apply theme card border color
      }}
    >
        <div className={` w-3 ${getTaskBGColor(task.taskPriority)}`}>

        </div>
     <div className="p-3 h-40 w-full ">
      <PriorityBadge priority={task.taskPriority} />
      <h3 className="font-medium mt-1">{task.taskName}</h3>
      <p className="text-xs mt-1">{task.taskDescription}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center">
            <span className="text-sm mr-1">⏱</span> {formatSeconds(task.taskTimeSpentInSeconds as number)??"Not Started"}
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-1">💬</span> 3
          </div>
        </div>
      </div>
      <div
        className="button absolute top-2 right-2"
        onClick={handleDeleteTask}
        style={{
          color: theme["button-text-color"], // Apply theme button text color
        }}
      >
        <MdDelete className="text-lg" />
      </div>
      </div>

    
    </div>
  );
};




export const CreateTaskCard = ({
  task: providedTask,
  onClickAddTask
}: {
  task: TaskType,
  onClickAddTask: () => void
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [task, setTask] = useState<TaskType>({
    taskName: "",
    taskDescription: "",
    taskPriority: "LOW",
    taskStatus: "Open",
    taskCreatedBy: "John Doe",
    taskCreatedDate: new Date().toDateString(),
    taskDeadlineDate: new Date().toDateString(),
    taskCategory: "WORK",
    taskParentRefId: "",
    taskTimeSpentInSeconds: 0
  });
  console.log(providedTask);
  const dashboardStore = useDashboardStore();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  
  const handleClose = () => {
    setOpenEdit(false);
  };
  
  const handleCreateTask = async () => {
    // Logic to create the task
    console.log("Task Created:", task);
    await createTask(task);
    setOpenEdit(false);
    dashboardStore.methods.setTasks((prev) => [...prev, task]);
    handleClose();
  };
  
  useEffect(() => {
    setTask(prev => {
      return {
        ...prev,
        ...providedTask
      };
    });
    console.log(providedTask);
  }, [providedTask]);
  
  return (
    <div className="grow-0 border-1 border-gray-600 bg-black/50 h-max rounded-lg p-4 flex flex-col gap-2">
      {/* Create new task card */}
      <div className="flex flex-col justify-center items-center gap-2 h-full">
        {openEdit && (
          <Dialog maxWidth="lg" fullWidth  open={openEdit} onClose={handleClose} title="Create Task">
            

            <div className="flex flex-col gap-4 w-full p-8">
              {/* Task name input */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Task Name</label>
                <input
                  type="text"
                  name="taskName"
                  placeholder="Enter task name"
                  value={task.taskName}
                  onChange={handleInputChange}
                  className=" p-2 rounded-md border border-gray-700 focus:border-gray-500 focus:outline-none w-full"
                />
              </div>
              
              {/* Task description textarea */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Task Description</label>
                <textarea
                  name="taskDescription"
                  placeholder="Enter task description"
                  rows={6}
                  value={task.taskDescription}
                  onChange={handleInputChange}
                  className=" p-2 rounded-md border border-gray-700 focus:border-gray-500 focus:outline-none w-full resize-none"
                />
              </div>
              
              {/* Priority selector */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Priority</label>
                <select
                  name="taskPriority"
                  value={task.taskPriority}
                  onChange={handleInputChange}
                  className=" p-2 rounded-md border border-gray-700 focus:border-gray-500 focus:outline-none w-full"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              
              {/* Category selector */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Category</label>
                <select
                  name="taskCategory"
                  value={task.taskCategory}
                  onChange={handleInputChange}
                  className=" p-2 rounded-md border border-gray-700 focus:border-gray-500 focus:outline-none w-full"
                >
                  <option value="WORK">Work</option>
                  <option value="PERSONAL">Personal</option>
                  <option value="STUDY">Study</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              {/* Deadline date */}
            {!providedTask.taskDeadlineDate ? <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Deadline</label>
                <input
                  type="date"
                  name="taskDeadlineDate"
                  value={task.taskDeadlineDate.split('T')[0]}
                  onChange={handleInputChange}
                  className=" p-2 rounded-md border border-gray-700 focus:border-gray-500 focus:outline-none w-full"
                />
              </div> : <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400"></label>
                <p className="text-sm text-gray-400"></p>
              </div>}
              
              {/* Action buttons */}
              <div className="flex flex-row gap-2 items-center justify-end mt-2">
                <button
                  onClick={handleClose}
                  className="btn-primary"
                >
                  <MdCancel className="text-white" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleCreateTask}
                  className="btn-primary"
                >
                  <TiTick className="text-white" />
                  <span>Create</span>
                </button>
              </div>
            </div>
          

          </Dialog>
        )}
        
        {!openEdit && (
          <div
            className="flex flex-row gap-2 justify-center items-center cursor-pointer w-full h-full"
            onClick={() => {
              onClickAddTask();
              setOpenEdit(true);
            }}
          >
            <p>Create New Task</p>
            <span>
              <IoAddCircleOutline className="text-lg" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};