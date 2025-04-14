import { useEffect, useState } from "react";
import { PAGE_SUBTITLE, PAGE_TITLE, TaskType } from "./constants";
import { useTaskDragAction } from "@components/TaskDragAction";
import { FcAddImage } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import WorkingTask from "./components/WorkingTask";
import TaskOverview from "./components/TaskOverview";
import { useDashboardStore } from "./model/context";
import { TaskDragActionContextProps } from "@components/TaskDragAction";
import SideActionDrawer from "./components/SideActionDrawer";
import { NotesEditor } from "@components/Editorjs";
import { useTheme } from "../../styles/Theme";
import { FiClock, FiCalendar, FiCheckSquare, FiAlertCircle, FiActivity, FiBarChart2 } from "react-icons/fi";
import { getTimeBasedBackgroundImage } from "./utilFunctions";
import { useLoginAuth } from "@contextProviders/LoginAuthProvider";
import { Calender } from "@components/Calender";
import { getNotesByRefId, saveNote } from "@controllers/notesControllers";
import { useDebounce } from "@utils/hooks";

// AI Summary component


// Main dashboard component
const Dashboard = () => {
  const { theme } = useTheme();
  let dashboardStore = useDashboardStore();
  let loginAuth = useLoginAuth()
  let taskDragAction = useTaskDragAction() as TaskDragActionContextProps;
  let todos = dashboardStore.state.tasks;
  let currentWorkingTask = taskDragAction.state.draggedTask as TaskType;

  useEffect(() => {
    if (currentWorkingTask) {
      dashboardStore.methods.updateActiveTask(currentWorkingTask);
    }
  }, [currentWorkingTask]);

  const [notes, setNotes] = useState(null);
  const onNotesChange = useDebounce((data) => {
    setNotes(data);
    let notesPayload = {
      noteBody: data,
      noteRefId: dashboardStore.state.currentWorkingTask?.taskId ?? "",
    }
    saveNote(notesPayload)
  }, 9000);

  // Get today's date formatted nicely
  const getTodayFormatted = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' } as const;
    return new Date().toLocaleDateString('en-US', options);
  };
  let userName = loginAuth.state.userDetails.userName
  let fetchNotes = async () => {
    let notes = await getNotesByRefId(dashboardStore.state.currentWorkingTask?.taskId ?? "")
    setNotes(notes?.noteBody ?? null)
  }

  useEffect(() => {
    fetchNotes()
  }, [dashboardStore.state.currentWorkingTask])
  console.log(dashboardStore.state.currentWorkingTask, "notes")
  return (
    <div
      className="min-h-screen"
      style={{
        // backgroundColor: theme["bg-layer-1"],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${getTimeBasedBackgroundImage()})`,
      
        backgroundAttachment: "fixed",
     
        backgroundBlendMode: "overlay",
        backdropFilter: "blur(10px)",
        color: theme["text-color"],
        
      }}
    >
      <div>

      </div>
      <div className="flex flex-row h-screen">
        <div className="w-8/10 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">{PAGE_TITLE(userName)}</h1>
              <div className="flex items-center">
                <FiCalendar className="mr-2" style={{ color: theme["accent-color"] }} />
                <span style={{ color: theme["text-secondary"] }}>{getTodayFormatted()}</span>
              </div>
            </div>

          </div>

          {!dashboardStore.state.currentWorkingTask && (
            <>


              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <FiClock className="text-xl mr-2" style={{ color: theme["accent-color"] }} />
                  <h2 className="text-xl font-semibold">Today's Tasks</h2>
                </div>
                <p className="text-sm mb-4" style={{ color: theme["text-secondary"] }}>
                  {PAGE_SUBTITLE}
                </p>
              </div>
            </>
          )}

          {dashboardStore.state.currentWorkingTask && (
            <div className="mb-6 ">
              <WorkingTask />
            </div>
          )}

          {dashboardStore.state.isNotesVisible ? (
            <div
              className="w-full rounded-xl p-4 bg-white/80 h-[96vh] overflow-auto"
              style={{

                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}
            >
              <NotesEditor data={notes} onChange={onNotesChange} onSave={onNotesChange} />
            </div>
          ) : (
            <TaskOverview />
          )}
        </div>

        <div
          className="w-2/10 h-full overflow-auto border-l"
          style={{
            backgroundColor: theme["bg-layer-2"],
            borderColor: theme["border-color"]
          }}
        >
          <SideActionDrawer />
        </div>
      </div>
    </div>
  );
};

// Action button component
export const DashboardActionElement = () => {
  const { theme } = useTheme();
  let navigate = useNavigate();

  const handleOpenCreateTask = () => {
    navigate("/createTask");
  };

  return (
    <button
      onClick={handleOpenCreateTask}
      className="flex items-center justify-center rounded-full p-3 hover:opacity-80 transition-opacity"
      style={{
        backgroundColor: theme["button-bg"],
        color: theme["button-text"],
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <FcAddImage className="text-xl mr-2" />
      <span className="font-medium">New Task</span>
    </button>
  );
};

export default Dashboard;