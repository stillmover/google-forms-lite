import { db } from 'server/src/db';
import { v4 as uuid } from 'uuid';
import { QuestionType, type Form } from '@gfl/shared';
import type { MutationResolvers } from './../../../generated/types.generated';

export const createForm: NonNullable<MutationResolvers['createForm']> = async (
  _parent,
  { title, description, questions = [] },
  _ctx,
) => {
  const safeQuestions = questions ?? [];

  const mapQuestionType = (
    type: 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE',
  ): QuestionType => {
    switch (type) {
      case 'TEXT':
        return QuestionType.Text;
      case 'MULTIPLE_CHOICE':
        return QuestionType.MultipleChoice;
      case 'CHECKBOX':
        return QuestionType.Checkbox;
      case 'DATE':
        return QuestionType.Date;
    }
  };

  const newForm: Form = {
    id: uuid(),
    title,
    description: description ?? null,
    questions: safeQuestions
      .filter(
        (
          question,
        ): question is {
          text: string;
          type: 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';
          options?: Array<string | null> | null;
        } => question != null,
      )
      .map(question => ({
        id: uuid(),
        text: question.text,
        type: mapQuestionType(question.type),
        options: question.options?.map(option => option ?? null) ?? null,
      })),
  };

  db.forms.push(newForm);

  return newForm;
};
