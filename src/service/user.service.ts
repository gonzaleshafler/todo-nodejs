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
    user.password = await hash(password, 10).catch((err) => {"Error hashing password"});
    this.userRepository.save(user);
    return this.generateToken(user.email);
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await compare(password, user.password))) {
      return this.generateToken(user.email);
    }
    throw new Error("Invalid email or password");
  }

  private generateToken(email: string) {
    return jwt.sign(
      { email , usefulData: "AMOGUS"},
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
  }
}
