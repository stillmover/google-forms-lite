import { db } from 'server/src/db';
import type { QueryResolvers } from './../../../generated/types.generated';

export const forms: NonNullable<QueryResolvers['forms']> = async (
  _parent,
  _arg,
  _ctx,
) => db.forms;
