import { db } from 'server/src/db';
import { v4 as uuid } from 'uuid';
import type { MutationResolvers } from './../../../generated/types.generated';

export const createForm: NonNullable<MutationResolvers['createForm']> = async (
  _parent,
  { title, description, questions },
) => {
  const safeQuestions = questions ?? [];

  const newForm = {
    id: uuid(),
    title,
    description: description ?? null,
    questions: safeQuestions
      .filter(q => q != null)
      .map(q => ({
        id: uuid(),
        text: q.text,
        type: q.type,
        options: q.options ?? null,
      })),
  };

  db.forms.push(newForm);

  return newForm;
};
