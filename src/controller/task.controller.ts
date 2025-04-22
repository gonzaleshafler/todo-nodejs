import { Request, Response, Router } from "express";
import { TaskService } from "../service/task.service";
import { AuthenticatedRequest, verifyToken } from "../middleware/auth";
import { TaskRepositoryService } from "../repositories/tasks/tasks-repository.service";
import { WorkspaceMemberService } from "../service/workspace-member.service";
import { WorkspaceMemberRepository } from "../repositories/workspace-members/workspace-member-repository.service";
import { TaskDto } from "../repositories/dto/TaskDto";

export class TaskController {
  public router = Router();
  private taskService = new TaskService(
    new TaskRepositoryService(),
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
      const data = req.body;
      const workspaceId = parseInt(req.params.workspaceId);
  
      //const taskData = new TaskDto({ data, workspaceId, createdById: req.user.id });
      const newTask = await this.taskService.createTask(
        {data, workspaceId, createdById: req.user.id}}
      );
      console.log(newTask);
      if (!newTask) {
        return res.status(400).json({ message: "Task creation failed" });
      }
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async update(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.taskId);
      const updateData = req.body;
      const updatedTask = await this.taskService.updateTask(
        new TaskDto({ ...updateData, id: taskId }),
      );
      res.status(200).json(updatedTask);
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
