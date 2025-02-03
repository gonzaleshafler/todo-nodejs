import { Request, Response, Router } from "express";
import { UserService } from "../service/user.service";

export class UserController {
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.router.post("/register", this.register.bind(this));
    this.router.post("/login", this.login.bind(this));
  }

  private async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      res
        .status(201)
        .json(await this.userService.createUser(name, email, password));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      res.status(200).json(await this.userService.loginUser(email, password));
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
