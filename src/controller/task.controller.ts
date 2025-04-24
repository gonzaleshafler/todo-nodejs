import { Request, Response, Router } from "express";
import { TaskService } from "../service/task.service";
import { AuthenticatedRequest, verifyToken } from "../middleware/auth";
import { TaskRepositoryService } from "../repositories/tasks/tasks-repository.service";
import { WorkspaceMemberService } from "../service/workspace-member.service";
import { WorkspaceMemberRepository } from "../repositories/workspace-members/workspace-member-repository.service";
import { CreateTaskDto } from "../repositories/dto/CreateTaskDto";
import { UpdateTaskDto } from "../repositories/dto/UpdateTaskDto";
import { TaskResponseDto } from "../repositories/dto/TaskResponseDto";

export class TaskController {
  public router = Router();
  private taskService = new TaskService(
    new WorkspaceMemberService(new WorkspaceMemberRepository()),
  );

  constructor() {
    this.router.post(
      "/workspaces/:workspaceId/tasks",
      verifyToken,
      this.create.bind(this),
    );
    this.router.get("/workspaces/:workspaceId/tasks", this.getAll.bind(this));
    this.router.get(
      "/workspaces/:workspaceId/tasks/:taskId",
      this.getById.bind(this),
    );
    this.router.put(
      "/workspaces/:workspaceId/tasks/:taskId",
      verifyToken,
      this.update.bind(this),
    );
    this.router.delete(
      "/workspaces/:workspaceId/tasks/:taskId",
      this.delete.bind(this),
    );
  }

  private async getAll(req: Request, res: Response) {
    try {
      const workspaceId = parseInt(req.params.workspaceId);

      const tasks = await this.taskService.getTasksByWorkspaceId(workspaceId);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  private async getById(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.taskId);
      const taskResponse = await this.taskService.getTaskById(taskId);
      res.status(200).json(taskResponse);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  private async create(req: AuthenticatedRequest, res: Response) {
    try {
      const workspaceId = parseInt(req.params.workspaceId);
      const createTaskDto = new CreateTaskDto({ ...req.body, workspaceId, createdById: req.user.id });
      console.log("createTaskDto", createTaskDto);
      const newTask = await this.taskService.createTask(createTaskDto, createTaskDto.createdById);
      const responseDto = new TaskResponseDto(newTask);
      res.status(201).json(responseDto);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async update(req: AuthenticatedRequest, res: Response) {
    try {
      const taskId = parseInt(req.params.taskId);
      const updateTaskDto = new UpdateTaskDto({ ...req.body, id: taskId });
      const updatedTask = await this.taskService.updateTask(updateTaskDto);
      const responseDto = new TaskResponseDto(updatedTask);
      res.status(200).json(responseDto);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async delete(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.taskId);
      await this.taskService.deleteTask(taskId);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
