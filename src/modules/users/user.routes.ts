import { FastifyInstance } from "fastify";
import { UserController } from "./user.controller";

const userController = new UserController();

export async function userRoutes(app: FastifyInstance) {
  app.post("/register", userController.register.bind(userController));
  app.post("/login", userController.login.bind(userController));
}