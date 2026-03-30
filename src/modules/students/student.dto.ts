export interface CreateStudentDTO {
  name: string;
  course: string;
  skills: string[];
  availability: string;
  portfolio?: string;
  userId: string;
}

export interface UpdateStudentDTO {
  name?: string;
  course?: string;
  skills?: string[];
  availability?: string;
  portfolio?: string;
  isVisible?: boolean;
}