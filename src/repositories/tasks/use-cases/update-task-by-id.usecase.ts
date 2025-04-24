import { AppDataSource } from "../../../data-source";
import { UpdateTaskDto } from "../../dto/UpdateTaskDto";
import { Task } from "../../entities/task";

export class UpdateTaskById {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(tasktransformedFields: UpdateTaskDto) {
    const { id: taskId, ...updateFields } = tasktransformedFields;

    if (!taskId) {
      throw new Error("Task ID is required for update.");
    }

    // Убедись, что есть хотя бы одно поле для обновления
    if (Object.keys(updateFields).length === 0) {
      throw new Error("No fields provided for update.");
    }

    const transformedFields = {
      ...updateFields,
      createdBy: updateFields.createdBy
        ? { id: updateFields.createdBy }
        : undefined,
    };
    await this.taskRepository.update(taskId, {
      title: transformedFields.title,
      description: transformedFields.description,
      status: transformedFields.status || "todo",
      createdBy:
        transformedFields.createdBy && transformedFields.createdBy.id
          ? { id: transformedFields.createdBy.id }
          : undefined,
      assignedTo: transformedFields.assignedTo
        ? { id: transformedFields.assignedTo }
        : undefined,
      parentTask:
        transformedFields.parentTask && transformedFields.parentTask
          ? { id: transformedFields.parentTask }
          : undefined,
    });
    return this.taskRepository.findOneBy({ id: taskId });
  }
}
