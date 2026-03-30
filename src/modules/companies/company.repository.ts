import { prisma } from "../../shared/prisma/prisma.client";
import { CreateCompanyDTO, UpdateCompanyDTO } from "./company.dto";

export class CompanyRepository {
  async create(data: CreateCompanyDTO) {
    return prisma.company.create({
      data,
    });
  }

  async findByUserId(userId: string) {
    return prisma.company.findUnique({
      where: { userId },
    });
  }

  async findById(id: string) {
    return prisma.company.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateCompanyDTO) {
    return prisma.company.update({
      where: { id },
      data,
    });
  }
}