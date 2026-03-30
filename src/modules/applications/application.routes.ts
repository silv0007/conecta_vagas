import { FastifyInstance } from "fastify";
import { ApplicationController } from "./application.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";
import { generateApplicationsCSV } from "./application.export";

const applicationController = new ApplicationController();

export async function applicationRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: authenticate(["STUDENT"]) }, applicationController.create.bind(applicationController));
  app.get("/me", { preHandler: authenticate(["STUDENT"]) }, applicationController.getMyApplications.bind(applicationController));
  app.get("/job/:jobId", { preHandler: authenticate(["COMPANY", "COORDINATOR"]) }, applicationController.getByJob.bind(applicationController));
  app.patch("/:id/status", { preHandler: authenticate(["COMPANY", "COORDINATOR"]) }, applicationController.updateStatus.bind(applicationController));

  app.get("/export/csv", { preHandler: authenticate(["COORDINATOR"]) }, async (request, reply) => {
    const csv = await generateApplicationsCSV();

    return reply
      .header("Content-Type", "text/csv")
      .header("Content-Disposition", "attachment; filename=candidaturas.csv")
      .send(csv);
  });
}