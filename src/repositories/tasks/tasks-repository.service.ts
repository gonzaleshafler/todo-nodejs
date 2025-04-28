import { get } from "http";
import { CreateTaskDto } from "../dto/CreateTaskDto";
import { UpdateTaskDto } from "../dto/UpdateTaskDto";
import { Task } from "../entities/task";
import { CreateTaskUseCase } from "./use-cases/create-task.usecase";
import { GetTaskById } from "./use-cases/get-task-by-id.usecase";
import { GetTaskByAssignedUserId } from "./use-cases/get-tasks-by-assigned-user-id.usecase";
import { GetTaskByCreatorUserId } from "./use-cases/get-tasks-by-creator-id.usecase";
import { UpdateTaskById } from "./use-cases/update-task-by-id.usecase";
import { GetTasksByWorkspaceId } from "./use-cases/get-tasks-by-workspace-id.usecase";
import { DeleteTask } from "./use-cases/delete-task.usecase";

export class TaskRepositoryService {
  private createTaskUseCase: CreateTaskUseCase;
  private getTasksByAssignedUserId: GetTaskByAssignedUserId;
  private getTaskByWorkspaceId: GetTasksByWorkspaceId;
  private getTasksByCreatorUserId: GetTaskByCreatorUserId;
  private getTaskById: GetTaskById;
  private updateTaskById: UpdateTaskById;
  private deleteTask: DeleteTask;
  constructor() {
    this.createTaskUseCase = new CreateTaskUseCase();
    this.getTasksByAssignedUserId = new GetTaskByAssignedUserId();
    this.getTasksByCreatorUserId = new GetTaskByCreatorUserId();
    this.getTaskByWorkspaceId = new GetTasksByWorkspaceId();
    this.getTaskById = new GetTaskById();
    this.updateTaskById = new UpdateTaskById();
    this.deleteTask = new DeleteTask();
  }

  async create(taskData: CreateTaskDto) {
    return this.createTaskUseCase.exec(taskData.toEntity());
  }

  async getByAssignedId(userId: number) {
    return this.getTasksByAssignedUserId.exec(userId);
  }

  async getByWorkspaceId(workspaceId: number) {
    return this.getTaskByWorkspaceId.exec(workspaceId);
  }
  async getById(id: number) {
    return this.getTaskById.exec(id);
  }

  async getByCreatorId(userId: number) {
    return this.getTasksByCreatorUserId.exec(userId);
  }
  async update(taskData: UpdateTaskDto) {
    return this.updateTaskById.exec(taskData);
  }
  async delete(id: number) {
    return this.deleteTask.exec(id);
  }
}
