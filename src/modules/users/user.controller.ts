import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./user.service";
import { CreateUserDTO, LoginDTO } from "./user.dto";

const userService = new UserService();

export class UserController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const { email, password, role } = request.body as CreateUserDTO;

    const user = await userService.create({ email, password, role });

    return reply.status(201).send(user);
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as LoginDTO;

    const user = await userService.login({ email, password });

    const token = await reply.jwtSign({
      id: user.id,
      role: user.role,
    });

    return reply.status(200).send({ token, user });
  }
}