import { User } from "../../entities/user";
import { AppDataSource } from "../../../data-source";
import { compare, hash } from "bcrypt";
import { SignUpDto } from "../../../auth/dto/sign-up.dto";

export class CreateUserUseCase {

  private userRepository = AppDataSource.getRepository(User);

  async exec(data : SignUpDto) {
    
    console.log(data.email + " sssss  "  + data.name);
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = await hash(data.password, 10).catch((err) => {
      "Error hashing password";
    });
    return await this.userRepository.save(user);
  }
}
