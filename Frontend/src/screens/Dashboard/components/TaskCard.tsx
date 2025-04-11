import { useTaskDragAction } from "@components/TaskDragAction";
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
  dragActions?: {
    title: string;
    onDrop: (task: TaskType) => void;
  }[];
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

  let handleDragEnd = (e) => {
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
      className={`p-3 relative hover:cursor-pointer rounded-lg w-full min-w-60 ${getTaskBGColor(task.taskPriority)}`}
      style={{
        // backgroundColor: theme["card-bg-color"], // Apply theme card background color
        color: theme["card-text-color"], // Apply theme card text color
        border: `1px solid ${theme["card-border-color"]}`, // Apply theme card border color
      }}
    >
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
  );
};
export const CreateTaskCard = () => {
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
    taskTimeSpentInSeconds:0
  });
  let dashboardStore = useDashboardStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCreateTask = async() => {
    // Logic to create the task
    console.log("Task Created:", task);
    await createTask(task);
    setOpenEdit(false);
    dashboardStore.methods.setTasks([...dashboardStore.state.tasks, task])
  };

  return (
    <div className="grow-0 border-1  border-gray-600 bg-black/50 h-40 rounded-lg p-4 flex flex-col gap-2">
      {/* Create new task card */}
      <div className="flex flex-col justify-center items-center gap-2 h-full">
        {openEdit && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="taskName"
              placeholder="Task Name"
              value={task.taskName}
              onChange={handleInputChange}
              className="bg-gray-900 p-2 rounded-md w-full"
            />
            <textarea
              name="taskDescription"
              placeholder="Task Description"
              value={task.taskDescription}
              onChange={handleInputChange}
              className="bg-gray-900 p-2 rounded-md w-full"
            />
            <select
              name="taskPriority"
              value={task.taskPriority}
              onChange={handleInputChange}
              className="bg-gray-900 p-2 rounded-md w-full"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
           
            <div className="flex flex-row gap-2 items-end justify-end">
              <div
                onClick={handleCreateTask}
                className="cursor-pointer button-outlined w-max bg-gray-700 rounded-md p-0.5"
              >
                <TiTick />
              </div>
              <div
                onClick={() => setOpenEdit(false)}
                className="cursor-pointer button-outlined w-max bg-gray-700 rounded-md p-0.5"
              >
                <MdCancel />
              </div>
            </div>
          </div>
        )}
        {!openEdit && (
          <div
            className="flex flex-col gap-2 justify-center items-center cursor-pointer"
            onClick={() => setOpenEdit(true)}
          >
            <p>Create New Task</p>
            <span>
              <IoAddCircleOutline />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};