
import { AppDataSource } from "../data-source";
import { WorkspaceService } from "./workspace.service";
import { WorkspaceMemberService } from "./workspace-member.service";
import { Workspace } from "../repositories/entities/workspace";
import { WorkspaceMember } from "../repositories/entities/workspace-members";
import { Task } from "../repositories/entities/task";
import { TaskRepositoryService } from "../repositories/tasks/tasks-repository.service";
import { TaskDto } from "../repositories/dto/TaskDto";

export class TaskService {
  updateTaskStatus(taskId: number, status: any) {
    throw new Error("Method not implemented.");
  }

 constructor(
    private taskRepository: TaskRepositoryService,
    private workspaceMemberService: WorkspaceMemberService,
  ) {
    
  }

  // constructor(workspaceService, workspaceMemberService)
  // {
  //   this.workspaceService = workspaceService;
  //   this.workspaceMemberService = workspaceMemberService;
  // }



  async getTaskById(id: number) {

    return this.taskRepository.getById(id);

    // const taskTree = await this.taskRepository.findOne({
    //   where: { id },
    //   relations: {
    //     workspace: true,
    //     createdBy: true,
    //     assignedTo: true,
    //     subTasks: true,
    //   },
    // });
    // if (!taskTree) {
    //   throw new Error("Task not found");
    // }

    // const subTasks = [];
    // if (taskTree.subTasks) {
    //   for (const subTask of taskTree.subTasks) {
    //     subTasks.push(await this.getTaskById(subTask.id));
    //   }
    // }
    // taskTree.subTasks = subTasks;
    // return taskTree;
  }

  async getTasksByCreatorId(userId: number) {

    return this.taskRepository.getByCreatorId(userId);

   // return await this.taskRepository.findBy({ createdBy: { id: userId } });
  }
  async getTaskByAssignedUserId(userId: number) {

    return this.taskRepository.getByAssignedId(userId);
    //return await this.taskRepository.findBy({ assignedTo: { id: userId } });
  }

  async getTasksByWorkspaceId(workspaceId: number) {

    return this.taskRepository.getByWorkspaceId(workspaceId);
   // return this.taskRepository.findBy({ workspace: { id: workspaceId } });
  }

  async createTask(
  taskData: TaskDto
  ) {

    // const task = new Task();
    // task.title = taskData.title;
    // task.description = taskData.description;
    // task.status = "todo";
    // task.createdAt = new Date();
    // task.workspace = { id: workspaceId } as Workspace;
    // task.createdBy = await this.workspaceMemberService.getWorkspaceMembers(
    //   workspaceId,
    //   createdById,
    // );

    // console.log(parentTaskId);
    // if (!parentTaskId) {
    //   task.parentTask = { id: parentTaskId } as Task;
    // }

    // if (!assignedToId) {
    //   task.assignedTo = { id: assignedToId } as WorkspaceMember;
    // } else {
    //   task.assignedTo = { id: createdById } as WorkspaceMember;
    // }

    // return await this.taskRepository.save(task);

    return this.taskRepository.create(taskData);
  }

  async updateTask(taskData: TaskDto) {


    return this.taskRepository.update(taskData);

    // await this.taskRepository.update(id, updateData);
    // return this.taskRepository.findOneBy({ id });
  }


  async deleteTask(id: number) {
    // const todo = await this.taskRepository.findOneBy({ id });
    // if (!todo) {
    //   throw new Error("Task not found");
    // }
    // return this.taskRepository.remove(todo);
  }
}
