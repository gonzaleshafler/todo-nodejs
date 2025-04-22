import { WorkspaceMember } from "../repositories/entities/workspace-members";
import { AppDataSource } from "../data-source";
import { User } from "../repositories/entities/user";
import { Workspace } from "../repositories/entities/workspace";
import { UserService } from "./user.service";
import { WorkspaceService } from "./workspace.service";
import { WorkspaceRepositoryService } from "../repositories/workspaces/workspace-repository.service";
import { WorkspaceMemberRepository } from "../repositories/workspace-members/workspace-member-repository.service";

export class WorkspaceMemberService {
  constructor(
    private workspaceMemberRepository: WorkspaceMemberRepository
  ) {}

  async create(userId: number, workspaceId: number) {
 
    return await this.workspaceMemberRepository.create(userId, workspaceId);
  }

  async getWorkspaceMembers(workspaceId: number, userId: number) {
    const memberships = await this.workspaceMemberRepository.getMembershipsById(workspaceId);

 
    return memberships;
  }

  // getWorkspaceMemberById(workspaceId: number, userId: number) {
  //   return this.workspaceMemberRepository({
  //     workspace: { id: workspaceId },
  //     user: { id: userId },
  //   });
  // }

  // async updateMembership(id: number, updateData: Partial<WorkspaceMember>) {
  //   await this.workspaceMemberRepository.update(id, updateData);
  //   const updated = await this.workspaceMemberRepository.findOneBy({ id });
  //   if (!updated) throw new Error("Membership not found");
  //   return updated;
  // }

}
