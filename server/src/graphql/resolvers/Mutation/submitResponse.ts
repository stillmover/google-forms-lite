import { v4 as uuid } from 'uuid';
import type { MutationResolvers } from './../../../generated/types.generated';
import { db } from '../../../db';

export const submitResponse: NonNullable<
  MutationResolvers['submitResponse']
> = async (_parent, { formId, answers }) => {
  const form = db.forms.find(f => f.id === formId);
  if (!form) throw new Error(`Form with id "${formId}" not found`);
  const newResponse = {
    id: uuid(),
    formId,
    answers: answers
      .filter(a => a != null)
      .map(({ questionId, value }) => ({
        questionId,
        value,
      })),
  };
  db.responses.push(newResponse);

  return newResponse;
};