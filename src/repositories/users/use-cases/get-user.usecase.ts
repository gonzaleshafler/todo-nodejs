import { User } from "../../entities/user";
import { AppDataSource } from "../../../data-source";

export class GetUserUseCase {
  private userRepository = AppDataSource.getRepository(User);

  async exec(findOptions: Partial<User>): Promise<User | null> {
    return await this.userRepository.findOneBy(findOptions);
  }
}
