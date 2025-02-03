import jwt from "jsonwebtoken";
import { User } from "../entity/user";
import { AppDataSource } from "../data-source";
import { compare, hash } from "bcrypt";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, password: string) {
    if (await this.userRepository.findOneBy({ email }))
      throw new Error("User already exists");
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await hash(password, 10);
    this.userRepository.save(user);
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await compare(password, user.password))) {
      return jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    }
    throw new Error("Invalid email or password");
  }
}
