import { User } from "../../entities/user";
import { AppDataSource } from "../../../data-source";

export class UpdateUserUseCase {
  private userRepository = AppDataSource.getRepository(User);

  async exec(id: number, updateData: Partial<User>) {
    await this.userRepository.update(id, updateData);
    return await this.userRepository.findOneBy({ id });
  }
}
