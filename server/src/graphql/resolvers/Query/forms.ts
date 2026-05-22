import type { QueryResolvers } from './../../../generated/types.generated';
import { db } from '../../../db';
import { normalizeQuestionType } from '../utils/question';

export const forms: NonNullable<QueryResolvers['forms']> = async () => {
  return db.forms.map(form => ({
    ...form,
    questions: form.questions.map(q => ({
      ...q,
      type: normalizeQuestionType(q.type),
    })),
  }));
};
