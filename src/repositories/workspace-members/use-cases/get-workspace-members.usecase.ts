
import { AppDataSource } from "../../../data-source";

import { SignUpDto } from "../../../auth/dto/sign-up.dto";
import { WorkspaceMember } from "../../entities/workspace-members";

export class GetWorkspaceMembersUseCase {

  private repository = AppDataSource.getRepository(WorkspaceMember);
  async exec(workspaceId : number) {
    const memberships = await this.repository.find({
      where: {
        workspace: { id: workspaceId },
      },
      relations: {
        //workspace: true,
        user: true,
      },
      select: {
        id: true,
        role: true,
        user: {
          id: true,
          name: true,
          email: true,
          password: false,
        },
      },
    });
    return memberships;
  }



  async getWorkspaceMembers(workspaceId: number) {
    const memberships = await this.repository.find({
      where: {
        workspace: { id: workspaceId },
      },
      relations: {
        //workspace: true,
        user: true,
      },
      select: {
        id: true,
        role: true,
        user: {
          id: true,
          name: true,
          email: true,
          password: false,
        },
      },
    });
    return memberships;
  }
}
