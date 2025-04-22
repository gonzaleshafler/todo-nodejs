import { title } from "process";
import { WorkspaceDto } from "../dto/WorkspaceDto";
import { CreateWorkspaceUseCase } from "./use-cases/create-workspace.usecase";
import { GetWorkspaceByIdUseCase } from "./use-cases/get-workspace-by-id.usecase";
import { UpdateWorkspaceUseCase } from "./use-cases/update-workspace.usecase";
import { Workspace } from "../entities/workspace";
import { DeleteWorkspaceUseCase } from "./use-cases/delete-workspace.usecase";
import { GetWorkspacesUseCase } from "./use-cases/get-workspaces.usecase";

export class WorkspaceRepositoryService {

  private createWorkspace: CreateWorkspaceUseCase;
  private getWorkspaceById: GetWorkspaceByIdUseCase;
  private updateWorkspaceById: UpdateWorkspaceUseCase;
  private deleteWorkspaceById: DeleteWorkspaceUseCase;
  private getWorkspaces: GetWorkspacesUseCase;

  constructor() {
    this.createWorkspace = new CreateWorkspaceUseCase();
    this.getWorkspaceById = new GetWorkspaceByIdUseCase();
    this.updateWorkspaceById = new UpdateWorkspaceUseCase();
    this.deleteWorkspaceById = new DeleteWorkspaceUseCase();
    this.getWorkspaces = new GetWorkspacesUseCase();
    
  }

  async create(title: string) {
    return this.createWorkspace.exec(title);
  }

  async getById(id: number) {
    return this.getWorkspaceById.exec(id);
  }
  getAll(userId: number) {
    return this.getWorkspaces.exec(userId);
  }
  async update(workspaceId: number, updateData: Partial<Workspace>) {
    console.log(updateData);
    return this.updateWorkspaceById.exec(workspaceId, updateData);
  }
  async delete(id: number) {
    return this.deleteWorkspaceById.exec(id);
  }
}
