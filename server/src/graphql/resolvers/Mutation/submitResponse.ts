import { v4 as uuid } from 'uuid';
import type { MutationResolvers } from './../../../generated/types.generated';
import { db } from '../../../db';

export const submitResponse: NonNullable<
  MutationResolvers['submitResponse']
> = async (_parent, { formId, answers }) => {
  const newResponse = {
    id: uuid(),
    formId,
    answers: answers
      .filter((a) => a != null)
      .map((a) => ({
        questionId: a.questionId,
        value: a.value,
      })),
  };

  db.responses.push(newResponse);

  return newResponse;
};