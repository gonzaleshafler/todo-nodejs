import jwt from "jsonwebtoken";
import { User } from "../repositories/entities/user";
import { AppDataSource } from "../data-source";
import { compare, hash } from "bcrypt";
import { UserRepositoryService } from "../repositories/users/user-repository.service";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { SignInDto } from "../auth/dto/sign-in.dto";

export class UserService {
  constructor(private userRepository: UserRepositoryService) {}

  async createUser(data: SignUpDto) {
    if (await this.userRepository.getByEmail(data.email))
      throw new Error("User already exists");
    console.log(data);
    const user = await this.userRepository.create(data);
    return await this.generateToken(data.email, user.id);
  }

  async loginUser(data: SignInDto) {
    const user = await this.userRepository.getByEmail(data.email);
    if (user && (await compare(data.password, user.password))) {
      return this.generateToken(user.email, user.id);
    }
    throw new Error("Invalid email or password");
  }

  async getUserById(id: number) {
    return (
      (await this.userRepository.getById(id)) ??
      Promise.reject(new Error("User not found"))
    );
  }

  async getUserByEmail(email: string) {
    return (
      (await this.userRepository.getByEmail(email)) ??
      Promise.reject(new Error("User not found"))
    );
  }

  async updateUser(id: number, updateData: Partial<User>) {
    if (!await this.userRepository.getById(id))
      throw new Error("User not exists");
    return await this.userRepository.update(id, updateData);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return this.userRepository.delete(id);
  }

  private generateToken(email: string, id: number) {
    return jwt.sign(
      { id, email, usefulData: "AMOGUS" },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
  }
}
