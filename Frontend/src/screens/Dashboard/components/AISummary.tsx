import { FiActivity, FiBarChart2, FiCheckSquare, FiAlertCircle } from "react-icons/fi";
import { useTheme } from "@styles/Theme";
import { useDashboardStore } from "../model/context";

const AISummary = () => {
    const { theme } = useTheme();
    let dashboardStore = useDashboardStore();
    let tasks = dashboardStore.state.tasks??[];
    // Calculate metrics
    const completedTasks = tasks.filter(task => task.taskStatus === "Completed").length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const urgentTasks = tasks.filter(task => 
      task.taskPriority === "HIGH" && task.taskStatus !== "Completed"
    ).length;
    
    // Get today's tasks
    const today = new Date().toISOString().split('T')[0];
    // const todaysTasks = tasks.filter(task => {
    //   const taskDate = new Date(task.taskDeadlineDate)?.toISOString().split('T')[0];
    //   return taskDate === today && task.taskStatus !== "Completed";
    // }).length;
    
    // Calculate productivity score (simple algorithm)
    const productivityScore = Math.min(100, Math.round(completionRate + (completedTasks * 5)));
    
    // Generate AI recommendation
    const getRecommendation = () => {
      if (urgentTasks > 2) {
        return "Focus on your high priority tasks first to reduce urgent backlog.";
      } else if (completionRate < 40) {
        return "Your completion rate is low. Consider breaking tasks into smaller chunks.";
      } else if (completionRate > 80) {
        return "Great work! Consider taking on more challenging tasks to grow.";
      } else {
        return "You're making good progress. Maintain your current pace.";
      }
    };
  
    return (
      <div 
        className="rounded-xl p-6 mb-6"
        style={{
          backgroundColor: theme["card-bg-color"],
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="flex items-center mb-4">
          <FiActivity className="text-xl mr-2" style={{ color: theme["accent-color"] }} />
          <h2 className="text-xl font-semibold" style={{ color: theme["text-color"] }}>AI Productivity Insights</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme["bg-layer-1"] }}>
            <div className="flex items-center mb-2">
              <FiBarChart2 className="mr-2" style={{ color: theme["accent-color"] }} />
              <h3 className="font-medium" style={{ color: theme["text-color"] }}>Productivity</h3>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold" style={{ color: theme["accent-color"] }}>{productivityScore}</span>
              <span className="ml-1 text-sm" style={{ color: theme["text-secondary"] }}>/100</span>
            </div>
          </div>
          
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme["bg-layer-1"] }}>
            <div className="flex items-center mb-2">
              <FiCheckSquare className="mr-2" style={{ color: theme["accent-color"] }} />
              <h3 className="font-medium" style={{ color: theme["text-color"] }}>Completion Rate</h3>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold" style={{ color: theme["accent-color"] }}>{completionRate}%</span>
              <span className="ml-1 text-sm" style={{ color: theme["text-secondary"] }}>({completedTasks}/{totalTasks})</span>
            </div>
          </div>
          
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme["bg-layer-1"] }}>
            <div className="flex items-center mb-2">
              <FiAlertCircle className="mr-2" style={{ color: theme["accent-color"] }} />
              <h3 className="font-medium" style={{ color: theme["text-color"] }}>Urgent Tasks</h3>
            </div>
            <div className="flex items-end">
              <span className="text-2xl font-bold" style={{ color: urgentTasks > 0 ? "#e53e3e" : theme["accent-color"] }}>{urgentTasks}</span>
              <span className="ml-1 text-sm" style={{ color: theme["text-secondary"] }}>outstanding</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg" style={{ backgroundColor: theme["bg-layer-1"] }}>
          <div className="flex items-center mb-3">
            <FiActivity className="mr-2" style={{ color: theme["accent-color"] }} />
            <h3 className="font-medium" style={{ color: theme["text-color"] }}>AI Recommendation</h3>
          </div>
          <p style={{ color: theme["text-secondary"] }}>{getRecommendation()}</p>
        </div>
      </div>
    );
  };
export default AISummary;