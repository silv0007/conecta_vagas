import { AppError } from "../../shared/errors/app.error";
import { CompanyRepository } from "./company.repository";
import { CreateCompanyDTO, UpdateCompanyDTO } from "./company.dto";

const companyRepository = new CompanyRepository();

export class CompanyService {
  async create(data: CreateCompanyDTO) {
    const companyExists = await companyRepository.findByUserId(data.userId);

    if (companyExists) {
      throw new AppError("Perfil de empresa já cadastrado.", 409);
    }

    return companyRepository.create(data);
  }

  async findByUserId(userId: string) {
    const company = await companyRepository.findByUserId(userId);

    if (!company) {
      throw new AppError("Empresa não encontrada.", 404);
    }

    return company;
  }

  async update(id: string, data: UpdateCompanyDTO) {
    const company = await companyRepository.findById(id);

    if (!company) {
      throw new AppError("Empresa não encontrada.", 404);
    }

    return companyRepository.update(id, data);
  }
}