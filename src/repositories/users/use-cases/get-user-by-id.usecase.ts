import { User } from "../../entities/user";
import { AppDataSource } from "../../../data-source";

export class GetUserByIdUseCase {
  private userRepository = AppDataSource.getRepository(User);

  async exec(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
