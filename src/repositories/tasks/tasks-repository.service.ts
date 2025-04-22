import { TaskDto } from "../dto/TaskDto";
import { Task } from "../entities/task";
import { CreateTaskUseCase } from "./use-cases/create-task.usecase";
import { GetTaskById } from "./use-cases/get-task-by-id.usecase";
import { GetTaskByAssignedUserId } from "./use-cases/get-tasks-by-assigned-user-id.usecase";
import { GetTaskByCreatorUserId } from "./use-cases/get-tasks-by-creator-id.usecase";
import { UpdateTaskById } from "./use-cases/update-task-by-id.usecase";


export class TaskRepositoryService {
  private createTaskUseCase :  CreateTaskUseCase;
  private getTasksByAssignedUserId :  GetTaskByAssignedUserId;
  private getTasksByCreatorUserId :  GetTaskByCreatorUserId;
  private getTaskById :  GetTaskById;
  private updateTaskById :  UpdateTaskById;
  constructor() {
    this.createTaskUseCase = new CreateTaskUseCase();
    this.getTasksByAssignedUserId = new GetTaskByAssignedUserId();
    this.getTasksByCreatorUserId = new GetTaskByCreatorUserId();
    this.getTaskById = new GetTaskById();
    this.updateTaskById = new UpdateTaskById();
  }
  async create(taskData : TaskDto) {
    return this.createTaskUseCase.exec(taskData);
  }

  async getByAssignedId(userId: number)
  {
    return this.getTasksByAssignedUserId.exec(userId);
  }


  async getByWorkspaceId(workspaceId: number)
  {
    return this.getTasksByAssignedUserId.exec(workspaceId);
  }
  async getById(id: number)
  {
    return this.getTaskById.exec(id);
  }

  async getByCreatorId(userId: number)
  {
    return this.getTasksByCreatorUserId.exec(userId);
  }
  async update(taskData: TaskDto)
  {
    return this.updateTaskById.exec(taskData);
  }
}
