import type { QueryResolvers } from './../../../generated/types.generated';
import { db } from 'server/src/db';

export const forms: NonNullable<QueryResolvers['forms']> = async () => {
  return db.forms;
};
