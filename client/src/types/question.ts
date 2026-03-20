import type { QuestionType } from '../api/generated';

export type QuestionModel = {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
};