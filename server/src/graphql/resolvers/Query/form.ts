import type { QueryResolvers } from '../../../generated/types.generated';
import { db } from '../../../db';
import { normalizeQuestionType } from '../utils/question';

export const form: NonNullable<QueryResolvers['form']> = async (
  _parent,
  { id },
) => {
  const found = db.forms.find(f => f.id === id);
  if (!found) return undefined;

  return {
    ...found,
    questions: found.questions.map(q => ({
      ...q,
      type: normalizeQuestionType(q.type),
    })),
  };
};
