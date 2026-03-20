import type { QueryResolvers } from './../../../generated/types.generated';
import { db } from 'server/src/db';

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
      type: q.type as 'MULTIPLE_CHOICE' | 'TEXT' | 'CHECKBOX' | 'DATE',
    })),
  };
};
