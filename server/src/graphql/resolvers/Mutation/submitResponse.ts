import { db } from 'server/src/db';
import { v4 as uuid } from 'uuid';
import type { MutationResolvers } from './../../../generated/types.generated';

export const submitResponse: NonNullable<
  MutationResolvers['submitResponse']
> = async (_parent, { formId, answers }, _ctx) => {
  const newResponse = {
    id: uuid(),
    formId,
    answers: answers
      .filter(
        (
          answer,
        ): answer is {
          questionId: string;
          value: string;
        } => answer != null,
      )
      .map(answer => ({
        questionId: answer.questionId,
        value: answer.value,
      })),
  };

  db.responses.push(newResponse);

  return newResponse;
};
