import bcrypt from "bcryptjs";
import { AppError } from "../../shared/errors/app.error";
import { UserRepository } from "./user.repository";
import { CreateUserDTO, LoginDTO } from "./user.dto";

const userRepository = new UserRepository();

export class UserService {
  async create(data: CreateUserDTO) {
    const userExists = await userRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError("Email já cadastrado.", 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 8);

    const user = await userRepository.create({ ...data, passwordHash });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async login(data: LoginDTO) {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Email ou senha inválidos.", 401);
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha inválidos.", 401);
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
