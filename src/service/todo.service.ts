import { ToDo } from "../entity/todo";
import { AppDataSource } from "../data-source";

export class ToDoService {
  
  private toDoRepository = AppDataSource.getRepository(ToDo);

  async getAllToDos() {
    return this.toDoRepository.find();
  }

  async createToDo(title: string, description: string) {
    const todo = new ToDo();
    todo.title = title;
    todo.description = description;
    return this.toDoRepository.save(todo);
  }

  async deleteToDoById(id: number) {
    const todo = await this.toDoRepository.findOneBy({ id });
    if (!todo) {
      throw new Error("ToDo not found");
    }
    return this.toDoRepository.remove(todo);
  }
}
