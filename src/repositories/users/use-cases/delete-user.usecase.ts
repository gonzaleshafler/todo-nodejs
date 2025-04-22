import { User } from "../../entities/user";
import { AppDataSource } from "../../../data-source";

export class DeleteUserByIdUseCase {
  private userRepository = AppDataSource.getRepository(User);

  async exec(id: number) {
    const user = await this.userRepository.findOneBy({id});
    return await this.userRepository.remove(user);
  }
}
