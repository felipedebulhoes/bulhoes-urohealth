/**
 * Datas em que o Dr. Felipe de Bulhões revisou o conteúdo médico de cada página.
 * Inclua uma página aqui somente depois da revisão real dele (formato AAAA-MM-DD).
 */
export const MEDICAL_REVIEW_DATES: Record<string, string> = {
  "/educativo/infeccao-urinaria": "2026-11-09",
};

export function getMedicalReviewDate(path: string): string | undefined {
  return MEDICAL_REVIEW_DATES[path];
}

export function formatMedicalReviewDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
