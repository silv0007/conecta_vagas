import { prisma } from "../../shared/prisma/prisma.client";

export async function generateApplicationsCSV(): Promise<string> {
  const applications = await prisma.application.findMany({
    include: {
      student: true,
      job: {
        include: {
          company: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "ID",
    "Aluno",
    "Curso",
    "Vaga",
    "Empresa",
    "Score",
    "Status",
    "Data de Candidatura",
  ].join(",");

  const rows = applications.map((app) => {
    return [
      app.id,
      app.student.name,
      app.student.course,
      app.job.title,
      app.job.company.name,
      app.score,
      app.status,
      new Date(app.createdAt).toLocaleDateString("pt-BR"),
    ].join(",");
  });

  return [header, ...rows].join("\n");
}