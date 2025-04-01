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
        case 'Open': return 'bg-gray-900';
        case 'In Progress': return 'bg-red-950/40';
        case 'Done': return 'bg-gray-900';
        default: return 'bg-gray-900';
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
    