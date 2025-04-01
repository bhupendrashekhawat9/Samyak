
export type TaskType = {
  taskName: string;
  taskDescription: string;
  taskStatus: "Open" | "In Progress" | "Completed";
  taskDeadlineDate: string;
  taskCreatedDate: string;
  taskCreatedBy: string;
  taskPriority: "LOW" | "MEDIUM" | "HIGH";
  taskParentRefId: string;
  taskAttachments: string[] | null;
  taskCategory: "WORK" | "PERSONAL" | "HEALTH" | "OTHER";
};

export let PAGE_TITLE = "TODAYS TASK"

export let TASK_DATA = {
    tasks:[
      {
        "taskName": "Complete Monthly Report",
        "taskDescription": "Prepare and finalize the monthly financial report.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "HIGH",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "WORK"
      },
      {
        "taskName": "Grocery Shopping",
        "taskDescription": "Buy essential groceries for the week.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "MEDIUM",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "PERSONAL"
      },
      {
        "taskName": "Morning Workout",
        "taskDescription": "Complete a 30-minute workout session.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "HIGH",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "HEALTH"
      },
      {
        "taskName": "Update Project Documentation",
        "taskDescription": "Revise and update project documentation for the new release.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "HIGH",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "WORK"
      },
      {
        "taskName": "Call Parents",
        "taskDescription": "Have a 30-minute call with parents to check in.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "HIGH",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "PERSONAL"
      },
      {
        "taskName": "Fix Bug in Todo App",
        "taskDescription": "Resolve the reported bug related to task completion status.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "HIGH",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "WORK"
      },
      {
        "taskName": "Read a Book (30 pages)",
        "taskDescription": "Read 30 pages of a book to maintain the reading habit.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "MEDIUM",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "PERSONAL"
      },
      {
        "taskName": "Pay Electricity Bill",
        "taskDescription": "Make the monthly electricity bill payment before the due date.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "HIGH",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "PERSONAL"
      },
      {
        "taskName": "Write Blog on JavaScript Best Practices",
        "taskDescription": "Draft and publish a blog post about JavaScript coding best practices.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "HIGH",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "WORK"
      },
      {
        "taskName": "Meditate for 20 Minutes",
        "taskDescription": "Practice mindfulness meditation for 20 minutes.",
        "taskStatus": "Open",
        "taskDeadlineDate": "2025-04-01",
        "taskCreatedDate": "2025-04-01",
        "taskCreatedBy": "Bhupendra Shekawat",
        "taskPriority": "MEDIUM",
        "taskParentRefId": "",
        "taskAttachments": null,
        "taskCategory": "HEALTH"
      }
    ],
    "summary":{
        totalTask:10,
        todaysTask:5,
        pendingTask:5,
        finishedTask:0
    }

}


