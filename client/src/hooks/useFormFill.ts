import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormQuery, useSubmitResponseMutation } from '../api/enhancedApi';
import {
  toSubmitAnswersPayload,
  type AnswersState,
  validateSubmitAnswersPayload,
} from '../services/formFill.service';

type FeedbackState = { type: 'success' | 'error'; text: string } | null;

export const useFormFill = () => {
  const { id = '' } = useParams();
  const { data, isLoading, isError } = useFormQuery(
    { id },
    { skip: id.length === 0 },
  );
  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();
  const [answers, setAnswers] = useState<AnswersState>({});
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const form = data?.form;

  const preparedAnswers = useMemo(
    () => toSubmitAnswersPayload(form, answers),
    [answers, form],
  );

  const setTextAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const setCheckboxAnswer = (
    questionId: string,
    option: string,
    checked: boolean,
  ) => {
    setAnswers(prev => {
      const current = prev[questionId];
      const currentArray = Array.isArray(current) ? current : [];
      const next = checked
        ? Array.from(new Set([...currentArray, option]))
        : currentArray.filter(value => value !== option);
      return { ...prev, [questionId]: next };
    });
  };

  const isChecked = (questionId: string, option: string) =>
    Array.isArray(answers[questionId]) && answers[questionId].includes(option);

  const getTextAnswer = (questionId: string) =>
    typeof answers[questionId] === 'string' ? answers[questionId] : '';

  const submit = async () => {
    setFeedback(null);
    if (!form) return false;

    const validationError = validateSubmitAnswersPayload(preparedAnswers);
    if (validationError) {
      setFeedback({ type: 'error', text: validationError });
      return false;
    }

    try {
      await submitResponse({
        formId: form.id,
        answers: preparedAnswers,
      }).unwrap();
      setFeedback({ type: 'success', text: 'Form submitted successfully!' });
      setAnswers({});
      return true;
    } catch (error) {
      setFeedback({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to submit form.',
      });
      return false;
    }
  };

  return {
    form,
    formId: form?.id ?? id,
    isLoading,
    isError,
    isSubmitting,
    feedback,
    getTextAnswer,
    isChecked,
    setTextAnswer,
    setCheckboxAnswer,
    submit,
  };
};
