export const parentIntakeFields = {
  studentName: "Student Name",
  dateOfBirth: "Date of Birth",
  parentGuardian: "Parent/Guardian Name",
  parentEmail: "Parent/Guardian Email",
  parentPhone: "Parent/Guardian Phone",
  communicationMethod: "Student's Communication Method",
  strengths: "Student's Strengths",
  goals: "Goals for Services",
  medicalConcerns: "Medical Concerns (if any)",
} as const;

export type ParentIntakeFormData = {
  studentName: string;
  dateOfBirth: string;
  parentGuardian: string;
  parentEmail: string;
  parentPhone: string;
  communicationMethod: string;
  strengths: string;
  goals: string;
  medicalConcerns: string;
};

export function formatIntakeForEmail(data: ParentIntakeFormData): string {
  return [
    "PARENT INTAKE FORM — RWH Life Skills & Learning Academy",
    "",
    `Student Name: ${data.studentName}`,
    `Date of Birth: ${data.dateOfBirth}`,
    `Parent/Guardian: ${data.parentGuardian}`,
    `Parent Email: ${data.parentEmail}`,
    `Parent Phone: ${data.parentPhone || "Not provided"}`,
    "",
    `Communication Method: ${data.communicationMethod}`,
    "",
    `Strengths: ${data.strengths}`,
    "",
    `Goals: ${data.goals}`,
    "",
    `Medical Concerns: ${data.medicalConcerns || "None reported"}`,
  ].join("\n");
}
