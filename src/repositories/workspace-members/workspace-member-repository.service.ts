import { title } from "process";
import { WorkspaceDto } from "../dto/WorkspaceDto";
import { CreateWorkspaceMemberUseCase } from "./use-cases/create-workspace-member.usecase";
import { GetWorkspaceMembersUseCase } from "./use-cases/get-workspace-members.usecase";
import { User } from "../entities/user";
import { WorkspaceMember } from "../entities/workspace-members";
import { UpdateWorkspaceUseCase } from "../workspaces/use-cases/update-workspace.usecase";
import { UpdateWorkspaceMemberUseCase } from "./use-cases/update-workspace-member.usecase";

export class WorkspaceMemberRepository {
  private createWorkspaceMember: CreateWorkspaceMemberUseCase;
  private getWorkspaceMembers: GetWorkspaceMembersUseCase;
  private updateWorkspaceMember = new UpdateWorkspaceMemberUseCase;

  constructor() {
    this.createWorkspaceMember = new CreateWorkspaceMemberUseCase();
    this.getWorkspaceMembers = new GetWorkspaceMembersUseCase();
    this.updateWorkspaceMember = new UpdateWorkspaceMemberUseCase();
  }

  async create(userId: number, workspaceId: number) {
    return this.createWorkspaceMember.exec(userId, workspaceId, "owner");
  }

  async getMembershipsById(workspaceId: number) {
    return await this.getWorkspaceMembers.exec(workspaceId);
  }
  async update(userId: number, updateData: Partial<WorkspaceMember>) {
    console.log(updateData);
    return this.updateWorkspaceMember.exec(userId, updateData);
  }
  // async delete(id: number) {
  //   return this.deleteUser.exec(id);
  // }
}
