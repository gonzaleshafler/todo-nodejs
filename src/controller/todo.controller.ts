import { Request, Response, Router } from "express";
import { ToDoService } from "../service/todo.service";

export class ToDoController {
  public router = Router();
  private toDoService = new ToDoService();

  constructor() {
    this.router.get("/", this.getAll.bind(this));
    this.router.post("/", this.create.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }

  private async getAll(req: Request, res: Response) {
    try {
      const todos = await this.toDoService.getAllToDos();
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  private async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const todo = await this.toDoService.createToDo(title, description);
      res.status(201).json(todo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.toDoService.deleteToDoById(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
