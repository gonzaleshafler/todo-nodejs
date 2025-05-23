import { AppDataSource } from "../data-source";
import { WorkspaceService } from "./workspace.service";
import { WorkspaceMemberService } from "./workspace-member.service";
import { Workspace } from "../repositories/entities/workspace";
import { WorkspaceMember } from "../repositories/entities/workspace-members";
import { Task } from "../repositories/entities/task";
import { TaskRepositoryService } from "../repositories/tasks/tasks-repository.service";
import { CreateTaskDto } from "../repositories/dto/CreateTaskDto";
import { UpdateTaskDto } from "../repositories/dto/UpdateTaskDto";
import { WorkspaceMemberRepository } from "../repositories/workspace-members/workspace-member-repository.service";

export class TaskService {

  constructor(private readonly taskRepository: TaskRepositoryService) {}


  async getTaskById(id: number) {
    return this.taskRepository.getById(id);
  }

  async getTasksByCreatorId(userId: number) {
    return this.taskRepository.getByCreatorId(userId);
  }

  async getTaskByAssignedUserId(userId: number) {
    return this.taskRepository.getByAssignedId(userId);
  }

  async getTasksByWorkspaceId(workspaceId: number) {

    return await this.taskRepository.getByWorkspaceId(workspaceId);
  }

  async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const workspaceMembers = await new WorkspaceMemberRepository().getMembershipsById(createTaskDto.workspaceId);
    const member = workspaceMembers.find((m) => m.user.id === userId);
    if(!await this.taskRepository.getById(createTaskDto.parentTaskId)) {
      throw new Error("Parent task not found");
    }
    if (!member) {
      throw new Error("User is not a member of the workspace");
    }

    // Update the DTO with the WorkspaceMember ID
    createTaskDto.createdById = member.id;
    return await this.taskRepository.create(createTaskDto);
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.update(updateTaskDto);
    return task;
  }

  async deleteTask(id: number) {
    return this.taskRepository.delete(id);
  }
}
