import { useTaskDragAction } from "@components/TaskDragAction";
import { TaskDragActionContextProps } from "components/TaskDragAction";
import { formatDate, getPriorityColor, getStatusColor, getTaskBGColor } from "../utilFunctions";


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

export const TaskCard = ({ task }) => {
    let taskDragAction = useTaskDragAction() as TaskDragActionContextProps
    let handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
      taskDragAction.methods.open()
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setDragImage(e.currentTarget, 0, 0)
      e.dataTransfer.setData("task", JSON.stringify(task))
    }
    let handleDragEnd = (e) => {
      taskDragAction.methods.close()
    }
  
    return <div
              draggable
              data-task={JSON.stringify(task)}
              onDragStart={(e)=>handleDragStart(e)}
              onDragEnd={handleDragEnd}
              className={`p-3 m-2 rounded-md ${getTaskBGColor(task.taskStatus)}`}
            >
              <PriorityBadge priority={task.taskPriority} />
              <h3 className="font-medium mt-1">{task.taskName}</h3>
              <p className="text-xs text-gray-400 mt-1">{task.taskDescription}</p>
              <div className="flex items-center justify-between mt-4">
    
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="flex items-center">
                    <span className="text-sm mr-1">⏱</span> Not Started
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-1">💬</span> 3
                  </div>
                </div>
              </div>
            </div>
    
    // <div draggable onDragEnd={handleDragEnd} onDragStart={handleDragStart} className={` rounded-lg  p-4 mb-3  h-max  ${getTaskBGColor(task.taskStatus)}`}>
    //   <div className="flex justify-between flex-col gap-10">
    //     <div className="flex-1">
    //       <h3 className="font-semibold text-lg">{task.taskName}</h3>
    //       <p className="text-sm text-gray-600">Created by: {task.taskCreatedBy}</p>
    //       <p className="text-sm text-gray-600">Due: {formatDate(task.taskDeadlineDate)}</p>
    //     </div>
    //     <div className="flex flex-row justify-end gap-2">
    //       <span className={` lowercase inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getPriorityColor(task.taskPriority)}`}>
    //         {task.taskPriority}
    //       </span>
    //       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.taskStatus)}`}>
    //         {task.taskStatus}
    //       </span>
    //     </div>
    //   </div>
    // </div>
  };