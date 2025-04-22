import { Workspace } from "../../entities/workspace";
import { AppDataSource } from "../../../data-source";
import { WorkspaceDto } from "../../dto/WorkspaceDto";

export class GetWorkspacesUseCase {
  private repository = AppDataSource.getRepository(Workspace);

  async exec(id: number) {
    const workspaces = await this.repository.find
    ({
      where: { members: { user: { id: id } } },
      relations: {
        members: {
          user: true,
        },
      },
      select: {
        id: true,
        title: true,
        members: {
          id: true,
          role: true,
          user: {
            id: true,
            name: true,
            email: true,
            password: false,
          },
        },
      },
    });
    return workspaces;
  }
}
