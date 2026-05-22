import type { QuestionType } from '../../../generated/types.generated';

const VALID_TYPES = new Set<string>([
  'TEXT',
  'MULTIPLE_CHOICE',
  'CHECKBOX',
  'DATE',
]);

export const normalizeQuestionType = (type: string): QuestionType =>
  VALID_TYPES.has(type) ? (type as QuestionType) : 'TEXT';