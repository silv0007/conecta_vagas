import { AppError } from "../../shared/errors/app.error";
import { ApplicationRepository } from "./application.repository";
import { CreateApplicationDTO, UpdateApplicationStatusDTO } from "./application.dto";
import { MatchService } from "../match/match.service";

const applicationRepository = new ApplicationRepository();
const matchService = new MatchService();

export class ApplicationService {
  async create(data: CreateApplicationDTO) {
    const alreadyApplied = await applicationRepository.findByStudentAndJob(
      data.studentId,
      data.jobId
    );

    if (alreadyApplied) {
      throw new AppError("Você já se candidatou a esta vaga.", 409);
    }

    const application = await applicationRepository.create(data);

    const applicationWithScore = await matchService.calculateAndSaveScore(application.id);

    return applicationWithScore ?? application;
  }

  async findByJobId(jobId: string) {
    return applicationRepository.findByJobId(jobId);
  }

  async findByStudentId(studentId: string) {
    return applicationRepository.findByStudentId(studentId);
  }

  async updateStatus(id: string, data: UpdateApplicationStatusDTO) {
    const application = await applicationRepository.findById(id);

    if (!application) {
      throw new AppError("Candidatura não encontrada.", 404);
    }

    return applicationRepository.updateStatus(id, data);
  }
}