import { db } from '../../../db';
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
        type: (["CHECKBOX", "DATE", "MULTIPLE_CHOICE", "TEXT"].includes(q.type)
          ? q.type
          : "TEXT") as "CHECKBOX" | "DATE" | "MULTIPLE_CHOICE" | "TEXT",
        options: Array.isArray(q.options)
          ? q.options.filter(opt => typeof opt === 'string')
          : null,
      })),
  };

  db.forms.push(newForm);

  return newForm;
};
