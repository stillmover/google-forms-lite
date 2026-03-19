export const QUESTION_TYPES = {
  TEXT: 'TEXT',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  CHECKBOX: 'CHECKBOX',
  DATE: 'DATE',
} as const;

export type QuestionTypeValues = typeof QUESTION_TYPES[keyof typeof QUESTION_TYPES];
