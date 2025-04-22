import { Workspace } from "../repositories/entities/workspace";
import { AppDataSource } from "../data-source";
import { UserService } from "./user.service";
import { get } from "http";
import { WorkspaceMemberService } from "./workspace-member.service";
import { WorkspaceMember } from "../repositories/entities/workspace-members";
import { User } from "../repositories/entities/user";
import { UserRepositoryService } from "../repositories/users/user-repository.service";
import { WorkspaceRepositoryService } from "../repositories/workspaces/workspace-repository.service";
import { WorkspaceMemberRepository } from "../repositories/workspace-members/workspace-member-repository.service";

export class WorkspaceService {
  constructor(
    private workspaceRepositoryService: WorkspaceRepositoryService,
    private workspaceMemberService: WorkspaceMemberService,
    private userService: UserService,
  ) {}

  // async getAllWorkspaces(userId: number) {
  // const workspaces = await this.workspaceRepository.find
  // ({
  //   where: { members: { user: { id: userId } } },
  //   relations: {
  //     members: {
  //       user: true,
  //     },
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     members: {
  //       id: true,
  //       role: true,
  //       user: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         password: false,
  //       },
  //     },
  //   },
  // });

  // console.log("workspace service get all  ");
  // workspaces.forEach((workspace)=> console.log(workspace.members))

  //   const workspaces = await this.workspaceRepository.find({
  //     where: { members: { user: { id: userId } } },
  //     select: {
  //       id: true,
  //       title: true,
  //     },
  //   });
  //   return workspaces;
  // }

  // async getWorkspaceById(workspaceId: number, userId: number) {
  //   const workspace = await this.workspaceRepository.findOne({
  //     where: { id: workspaceId },
  //     relations: {
  //       members: {
  //         user: true,
  //         tasks: true,
  //       },
  //     },
  //     select: {
  //       id: true,
  //       title: true,
  //       members: {
  //         id: true,
  //         role: true,
  //         user: {
  //           id: true,
  //           name: true,
  //           email: true,
  //           password: false,
  //         },
  //       },
  //     },
  //   });

  //   if (!workspace) {
  //     throw new Error("Workspace not found");
  //   }

  //   const isMember = workspace.members.some(
  //     (member) => member.user.id === userId,
  //   );

  //   if (!isMember) {
  //     throw new Error("Access denied");
  //   }

  //   return workspace;
  // }

  async getAllWorkspaces(userId: number) {
    return await this.workspaceRepositoryService.getAll(userId);
  }
  async getWorkspaceById(workSpaceId: number, userId?: number) {
    return await this.workspaceRepositoryService.getById(workSpaceId);
  }
  async createWorkspace(userId: number, title: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new Error("User not found");

    const workspace = await this.workspaceRepositoryService.create(title);
    const workspaceMember = await this.workspaceMemberService.create(
      user.id,
      workspace.id,
    );
    await this.workspaceRepositoryService.update(workspace.id, {
      createdBy: workspaceMember,
    });
    return await this.workspaceRepositoryService.getById(workspace.id);
  }

  async updateWorkspace(workspaceId: number, updateData: Partial<Workspace>) {
    if (!this.workspaceRepositoryService.getById(workspaceId)) {
      throw new Error("Workspace doesn't exist");
    }

    await this.workspaceRepositoryService.update(workspaceId, updateData);
    return this.workspaceRepositoryService.getById(workspaceId);

    //return await this.workspaceRepositoryService.getById(workspaceId);
  }

  async deleteWorkspaceById(workspaceId: number) {
    return this.workspaceRepositoryService.delete(workspaceId);
  }
}
