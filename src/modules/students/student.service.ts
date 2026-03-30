import { AppError } from "../../shared/errors/app.error";
import { StudentRepository } from "./student.repository";
import { CreateStudentDTO, UpdateStudentDTO } from "./student.dto";

const studentRepository = new StudentRepository();

export class StudentService {
  async create(data: CreateStudentDTO) {
    const studentExists = await studentRepository.findByUserId(data.userId);

    if (studentExists) {
      throw new AppError("Perfil de aluno já cadastrado.", 409);
    }

    return studentRepository.create(data);
  }

  async findByUserId(userId: string) {
    const student = await studentRepository.findByUserId(userId);

    if (!student) {
      throw new AppError("Aluno não encontrado.", 404);
    }

    return student;
  }

  async findAll() {
    return studentRepository.findAll();
  }

  async update(id: string, data: UpdateStudentDTO) {
    const student = await studentRepository.findById(id);

    if (!student) {
      throw new AppError("Aluno não encontrado.", 404);
    }

    return studentRepository.update(id, data);
  }
}