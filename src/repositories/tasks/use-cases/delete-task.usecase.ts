import { AppDataSource } from "../../../data-source";
import { Task } from "../../entities/task";

export class DeleteTask {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        subTasks: true,
      },
    });

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

 
    if (task.subTasks && task.subTasks.length > 0) {
      await this.taskRepository.delete(task.subTasks.map(subtask => subtask.id));
    }


    return await this.taskRepository.remove(task);
  }
}
