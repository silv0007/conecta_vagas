import { ApplicationStatus } from "../../generated/prisma";

export interface CreateApplicationDTO {
  studentId: string;
  jobId: string;
}

export interface UpdateApplicationStatusDTO {
  status: ApplicationStatus;
}