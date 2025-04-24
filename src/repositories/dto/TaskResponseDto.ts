import { Task } from "../entities/task";

export class TaskResponseDto {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.createdAt = task.createdAt;
  }
}
