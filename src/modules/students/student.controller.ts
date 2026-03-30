import { FastifyRequest, FastifyReply } from "fastify";
import { StudentService } from "./student.service";
import { CreateStudentDTO, UpdateStudentDTO } from "./student.dto";

const studentService = new StudentService();

export class StudentController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as Omit<CreateStudentDTO, "userId">;
    const userId = request.user.id;

    const student = await studentService.create({ ...data, userId });

    return reply.status(201).send(student);
  }

  async getMyProfile(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const student = await studentService.findByUserId(userId);

    return reply.send(student);
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const students = await studentService.findAll();

    return reply.send(students);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = request.body as UpdateStudentDTO;

    const student = await studentService.update(id, data);

    return reply.send(student);
  }
}