export type TaskType = {
    taskName?: string;
    taskDescription?: string;
    taskStatus?: "Open" | "In Progress" | "Completed";
    taskDeadlineDate?: string;
    taskCreatedDate?: string;
    taskCreatedBy?: string;
    taskPriority?: "LOW" | "MEDIUM" | "HIGH";
    taskParentRefId?: string;
    taskAttachments?: string[] | null;
    taskCategory?: "WORK" | "PERSONAL" | "HEALTH" | "OTHER";
  };
  