import moment from "moment";
import { TaskType } from "./constants";

const today = new Date();
today.setHours(0, 0, 0, 0);

// Get yesterday's date
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// Get tomorrow's date for future tasks calculation
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

  
  // Get priority color
 export const getPriorityColor = (priority) => {
      switch (priority) {
        case "HIGH":
          return "bg-red-500";
        case "MEDIUM":
          return "bg-yellow-500";
        case "LOW":
          return "bg-green-500";
        default:
          return "bg-gray-500";
      }
    };
    
    // Get status color
 export   const getStatusColor = (status) => {
      switch (status) {
        case "Open":
          return "bg-blue-100 text-blue-800";
        case "In Progress":
          return "bg-purple-100 text-purple-800";
        case "Completed":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
   export const getTaskBGColor = (status) => {
      switch (status) {
        case 'LOW': return 'bg-green-400';
        case 'HIGH': return 'bg-orange-600';
        case 'MEDIUM': return 'bg-blue-600';
        default: return 'bg-gray-400';
      }
    };
    // Format date to readable string
  export  const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };

    export const formatSeconds = (time: number | string): string | null => {
      // Convert input to seconds
      const seconds = typeof time === "string" ? parseInt(time) : time;
      
      // If invalid input, return null
      if (isNaN(seconds) || seconds <= 0) return null;
    
      // Calculate hours, minutes, and remaining seconds
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
    
      // Build the formatted string
      let formattedTime = "";
      
      if (hours > 0) {
        formattedTime += `${hours} hr `;
      }
      
      if (minutes > 0) {
        formattedTime += `${minutes} min `;
      }
      
      if (remainingSeconds > 0 || formattedTime === "") {
        formattedTime += `${remainingSeconds} sec`;
      }
    
      return formattedTime.trim();
    };
    
  export  const groupByYear = (tasks: TaskType[]) => {
      return tasks.reduce((acc, task) => {
        const year = new Date(task.taskDeadlineDate).getFullYear();
        acc[year] = acc[year] || [];
        acc[year].push(task);
        return acc;
      }, {} as Record<number, TaskType[]>);
    };
    
  export  const groupByMonth = (tasks: TaskType[]) => {
      return tasks.reduce((acc, task) => {
        const date = new Date(task.taskDeadlineDate);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        acc[key] = acc[key] || [];
        acc[key].push(task);
        return acc;
      }, {} as Record<string, TaskType[]>);
    };
  export  const getWeekOfMonth = (date: Date) => {
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
    
    
   export  const groupByWeek = (tasks: TaskType[]) => {
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
    export const getSelectedWeek = (date?:Date)=>{
      let currentDate = moment(date)
      let weekStart = currentDate.startOf("week")
      return {
        startDate: new Date(weekStart.toISOString()),
        endDate: new Date(weekStart.add(6,"days").toISOString())
      }

    }
    export let getWeekDays = (startDate:Date,endDate:Date)=>{
        let weekDays: {name:string,date:Date}[] = [];
        
        let start = moment(getSelectedWeek(startDate).startDate)
        let end = moment(start).add(6,"days")
    
        while(start.isSameOrBefore(end)){
          weekDays.push({
            name:start.format("dddd")+" "+start.date(),
            date:new Date(start.toISOString())
          })
          start.add(1,"day")
        }
        return weekDays
        
      }
    export let groupByWeekDays = (tasks: TaskType[],startDate:Date,endDate:Date) => {
      // Get current date for the weekly view
      const currentDate = new Date();
      const dayOfWeek = currentDate.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days, otherwise calculate days until Monday
      const monday = new Date(currentDate);
      monday.setDate(currentDate.getDate() + mondayOffset);
    
      // Generate weekday headers
      let weekdays: { name: string, date: Date }[] = getWeekDays(startDate,endDate)

      const tasksByDay = {};
      weekdays.forEach(day => {
        tasksByDay[day.name] = [];
      });
    
      tasks.forEach(task => {
    
        const taskDate = new Date(task.taskDeadlineDate);
    
        const dayName = moment(taskDate).format("dddd");
        const dayNum = taskDate.getDate();
        const dayKey = `${dayName} ${dayNum}`;
    
        if (tasksByDay[dayKey]) {
          tasksByDay[dayKey].push(task);
        }
      });
    
      return [tasksByDay, weekdays];
    
    }
    

    export const getTimeBasedBackgroundImage = (): string => {
      const hour = new Date().getHours();
      return "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop"
      // Early Morning (5 AM - 8 AM)
      if (hour >= 5 && hour < 8) {
        return "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop";
      }
    
      // Morning (8 AM - 12 PM)
      if (hour >= 8 && hour < 12) {
        return "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop";
      }
    
      // Afternoon (12 PM - 4 PM)
      if (hour >= 12 && hour < 16) {
        return "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=2070&auto=format&fit=crop";
      }
    
      // Evening (4 PM - 7 PM)
      if (hour >= 16 && hour < 19) {
        return "https://images.unsplash.com/photo-1704542857893-04e016265ca6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      }
          // Evening (7 PM - 5 AM)
          if (hour >= 19 && hour < 20) {
            return "https://media.istockphoto.com/id/450602521/photo/night-starry-sky.webp?s=2048x2048&w=is&k=20&c=rtTtoSPgT5nCyTEaQEY3cg-MFkzbD5cAsOIBSpvgj5c=";
          }
    
      // Night (8 PM - 5 AM)
      return "https://images.unsplash.com/photo-1654458471293-2ef62c5919f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    };