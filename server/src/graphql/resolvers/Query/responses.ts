import type { QueryResolvers } from './../../../generated/types.generated';
import { db } from '../../../db';

export const responses: NonNullable<QueryResolvers['responses']> = async (
  _parent,
  { formId },
) => {
  return db.responses.filter(r => r.formId === formId);
};
