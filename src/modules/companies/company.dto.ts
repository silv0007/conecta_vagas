export interface CreateCompanyDTO {
  name: string;
  about?: string;
  userId: string;
}

export interface UpdateCompanyDTO {
  name?: string;
  about?: string;
}