import { FastifyRequest, FastifyReply } from "fastify";
import { ApplicationService } from "./application.service";
import { UpdateApplicationStatusDTO } from "./application.dto";
import { StudentRepository } from "../students/student.repository";

const applicationService = new ApplicationService();
const studentRepository = new StudentRepository();

export class ApplicationController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { jobId } = request.body as { jobId: string };
    const userId = request.user.id;

    const student = await studentRepository.findByUserId(userId);

    if (!student) {
      throw new Error("Perfil de aluno não encontrado.");
    }

    const application = await applicationService.create({
      studentId: student.id,
      jobId,
    });

    return reply.status(201).send(application);
  }

  async getByJob(request: FastifyRequest, reply: FastifyReply) {
    const { jobId } = request.params as { jobId: string };

    const applications = await applicationService.findByJobId(jobId);

    return reply.send(applications);
  }

  async getMyApplications(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const student = await studentRepository.findByUserId(userId);

    if (!student) {
      throw new Error("Perfil de aluno não encontrado.");
    }

    const applications = await applicationService.findByStudentId(student.id);

    return reply.send(applications);
  }

  async updateStatus(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = request.body as UpdateApplicationStatusDTO;

    const application = await applicationService.updateStatus(id, data);

    return reply.send(application);
  }
}