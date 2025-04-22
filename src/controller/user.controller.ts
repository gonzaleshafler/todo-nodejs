import { Request, Response, Router } from "express";
import { UserService } from "../service/user.service";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { SignInDto } from "../auth/dto/sign-in.dto";
import { AuthenticatedRequest, verifyToken } from "../middleware/auth";

export class UserController {
  public router = Router();

  constructor(private userService: UserService) {
    this.router.post("/register", this.register.bind(this));
    this.router.post("/login", this.login.bind(this));
    this.router.get("/", verifyToken, this.getUserById.bind(this));
    this.router.put("/", verifyToken, this.updateUser.bind(this));
    this.router.delete("/", verifyToken, this.deleteUser.bind(this));
  }

  private async getUserById(req: AuthenticatedRequest, res: Response) {
    try {
        
      res.status(200).json(await this.userService.getUserById(req.user.id));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  private async register(req: Request, res: Response) {
    try {
      const data = req.body;
      res.status(201).json(await this.userService.createUser(data));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async login(req: Request, res: Response) {
    try {
      const data = req.body;

      res.status(200).json(await this.userService.loginUser(data));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }



  private async updateUser(req: AuthenticatedRequest, res: Response) {
    try {
      res
        .status(200)
        .json(await this.userService.updateUser(req.user.id, req.body));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async deleteUser(req: AuthenticatedRequest, res: Response) {
    try {
      await this.userService.deleteUser(req.user.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
