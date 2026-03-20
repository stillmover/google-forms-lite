import type { QueryResolvers } from './../../../generated/types.generated';
import { db } from 'server/src/db';

export const responses: NonNullable<QueryResolvers['responses']> = async (
  _parent,
  { formId },
) => {
  return db.responses.filter(r => r.formId === formId);
};
