import type { AnswerInput, FormQuery } from '../api/generated';

export type AnswersState = Record<string, string | string[]>;

type FormData = FormQuery['form'];

export const normalizeAnswerValue = (value: string) => value.trim();

export const toSubmitAnswersPayload = (
  form: FormData,
  answers: AnswersState,
): AnswerInput[] => {
  if (!form) return [];

  return form.questions.flatMap(question => {
    const raw = answers[question.id];

    if (Array.isArray(raw)) {
      const cleanValues = raw.map(normalizeAnswerValue).filter(Boolean);

      if (cleanValues.length === 0) return [];

      return [
        {
          questionId: question.id,
          value: cleanValues,
        },
      ];
    }

    const cleanValue = raw ? normalizeAnswerValue(raw) : '';
    if (!cleanValue) return [];

    return [
      {
        questionId: question.id,
        value: [cleanValue],
      },
    ];
  });
};
export const validateSubmitAnswersPayload = (
  answers: AnswerInput[],
): string | null => {
  if (answers.length === 0) {
    return 'Please provide at least one answer before submitting the form.';
  }
  return null;
};
