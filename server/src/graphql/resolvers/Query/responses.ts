import { db } from 'server/src/db';
import type { QueryResolvers } from './../../../generated/types.generated';

export const responses: NonNullable<QueryResolvers['responses']> = async (
  _parent,
  { formId },
  _ctx,
) => db.responses.filter(item => item.formId === formId);
