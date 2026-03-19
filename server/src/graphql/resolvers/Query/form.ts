import { db } from 'server/src/db';
import type { QueryResolvers } from './../../../generated/types.generated';

export const form: NonNullable<QueryResolvers['form']> = async (
  _parent,
  { id },
  _ctx,
) => db.forms.find(item => item.id === id) ?? null;
