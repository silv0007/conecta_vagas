import { FastifyInstance } from "fastify";
import { CompanyController } from "./company.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";

const companyController = new CompanyController();

export async function companyRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: authenticate(["COMPANY"]) }, companyController.create.bind(companyController));
  app.get("/me", { preHandler: authenticate(["COMPANY"]) }, companyController.getMyProfile.bind(companyController));
  app.put("/:id", { preHandler: authenticate(["COMPANY", "COORDINATOR"]) }, companyController.update.bind(companyController));
}
