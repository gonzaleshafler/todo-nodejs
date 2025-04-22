import { SignInDto } from "../../auth/dto/sign-in.dto";
import { SignUpDto } from "../../auth/dto/sign-up.dto";
import { User } from "../entities/user";
import { CreateUserUseCase } from "./use-cases/create-user.usecase";
import { DeleteUserByIdUseCase } from "./use-cases/delete-user.usecase";
import { GetUserByIdUseCase } from "./use-cases/get-user-by-id.usecase";
import { GetUserUseCase } from "./use-cases/get-user.usecase";
import { UpdateUserUseCase } from "./use-cases/update-user.usecase";

export class UserRepositoryService {
  private createUserUseCase: CreateUserUseCase;
  private getUserUseCase: GetUserUseCase;
  private getUserByIdUseCase: GetUserByIdUseCase;
  private updateUser: UpdateUserUseCase;
  private deleteUser: DeleteUserByIdUseCase;
  constructor(
  ) {
    this.getUserUseCase = new GetUserUseCase();
    this.getUserByIdUseCase = new GetUserByIdUseCase();
    this.createUserUseCase = new CreateUserUseCase();
    this.updateUser = new UpdateUserUseCase();
    this.deleteUser = new DeleteUserByIdUseCase();
  }

  async create(signUpDto : SignUpDto) {
    return this.createUserUseCase.exec(signUpDto);
  }

  async getByEmail(email: string)
  {
    console.log(email);
    return this.getUserUseCase.exec({email});
  }

  async getById(id:number)
  {
    return this.getUserByIdUseCase.exec(id);
  }
  async update(userId: number, updateData: Partial<User>)
  {
    console.log(updateData)
    return this.updateUser.exec(userId, updateData);
  }
  async delete(id : number)
  {
    return this.deleteUser.exec(id);
  }
}
