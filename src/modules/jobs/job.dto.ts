import { JobModel } from "../../generated/prisma";

export interface CreateJobDTO {
  title: string;
  description: string;
  skills: string[];
  model: JobModel;
  location?: string;
  course?: string;
  availability?: string;
  companyId: string;
}

export interface UpdateJobDTO {
  title?: string;
  description?: string;
  skills?: string[];
  model?: JobModel;
  location?: string;
  course?: string;
  availability?: string;
  isActive?: boolean;
}