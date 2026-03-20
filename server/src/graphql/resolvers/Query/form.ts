import type { QueryResolvers } from './../../../generated/types.generated';
import { db } from 'server/src/db';

export const form: NonNullable<QueryResolvers['form']> = async (
  _parent,
  { id },
) => {
  return db.forms.find(f => f.id === id) ?? null;
};
