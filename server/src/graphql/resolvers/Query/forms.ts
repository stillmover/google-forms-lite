import type { QueryResolvers } from './../../../generated/types.generated';
import { db } from 'server/src/db';

export const forms: NonNullable<QueryResolvers['forms']> = async () => {
  return db.forms.map(form => ({
    ...form,
    questions: form.questions.map(question => ({
      ...question,
      type:
        question.type === 'CHECKBOX' ||
        question.type === 'DATE' ||
        question.type === 'MULTIPLE_CHOICE' ||
        question.type === 'TEXT'
          ? question.type
          : 'TEXT',
    })),
  }));
};
