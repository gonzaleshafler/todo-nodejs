export type TaskStatus = "todo" | "in_progress" | "done";

export class TaskDto {
  static fromRequest(data: any, workspaceId: number, id: number): TaskDto {
    throw new Error("Method not implemented.");
  }
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  parentTaskId?: number;
  workspaceId: number;
  createdById?: number;
  assignedToId?: number;

  constructor(task: any) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.createdAt = task.createdAt;
    
    this.parentTaskId = task.parentTask ? task.parentTask.id : undefined;
    this.workspaceId = task.workspace.id;
    this.createdById = task.createdBy ? task.createdBy.id : undefined;
    this.assignedToId = task.assignedTo ? task.assignedTo.id : undefined;
  }
}