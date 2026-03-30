import { FastifyInstance } from "fastify";
import { StudentController } from "./student.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";

const studentController = new StudentController();

export async function studentRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: authenticate(["STUDENT"]) }, studentController.create.bind(studentController));
  app.get("/me", { preHandler: authenticate(["STUDENT"]) }, studentController.getMyProfile.bind(studentController));
  app.get("/", { preHandler: authenticate(["COORDINATOR", "COMPANY"]) }, studentController.getAll.bind(studentController));
  app.put("/:id", { preHandler: authenticate(["STUDENT", "COORDINATOR"]) }, studentController.update.bind(studentController));
}