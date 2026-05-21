import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { useCreateFormMutation } from '../api/enhancedApi';
import {
  toCreateFormPayload,
  validateCreateFormDraft,
} from '../services/formBuilder.service';
import {
  addDraftQuestion,
  addDraftQuestionOption,
  moveDraftQuestion,
  removeDraftQuestion,
  removeDraftQuestionOption,
  resetCreateDraft,
  updateCreateDraft,
  updateDraftQuestion,
  updateDraftQuestionOption,
  type DraftQuestion,
} from '../store/formsSlice';
import type { QuestionType } from '../api/generated';

export function useCreateForm() {
  const dispatch = useAppDispatch();
  const draft = useAppSelector(state => state.forms.createDraft);

  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const setTitle = (value: string) =>
    dispatch(updateCreateDraft({ title: value }));

  const setDescription = (value: string) =>
    dispatch(updateCreateDraft({ description: value }));

  const addQuestion = (type: QuestionType) =>
    dispatch(
      addDraftQuestion({
        id: crypto.randomUUID(),
        type,
      }),
    );

  const updateQuestion = (id: string, patch: Partial<DraftQuestion>) =>
    dispatch(updateDraftQuestion({ id, patch }));

  const moveQuestion = (id: string, direction: 'up' | 'down') =>
    dispatch(moveDraftQuestion({ id, direction }));

  const removeQuestion = (id: string) => dispatch(removeDraftQuestion(id));

  const addOption = (id: string) => dispatch(addDraftQuestionOption(id));

  const updateOption = (id: string, index: number, value: string) =>
    dispatch(
      updateDraftQuestionOption({
        id,
        optionIndex: index,
        value,
      }),
    );

  const removeOption = (id: string, index: number) =>
    dispatch(
      removeDraftQuestionOption({
        id,
        optionIndex: index,
      }),
    );

  const reset = () => dispatch(resetCreateDraft());

  const saveForm = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationError = validateCreateFormDraft(draft);
    if (validationError) {
      setErrorMessage(validationError);
      return false;
    }

    try {
      await createForm(toCreateFormPayload(draft)).unwrap();
      dispatch(resetCreateDraft());

      setSuccessMessage('Form created successfully. Redirecting to Home...');

      setTimeout(() => navigate('/'), 1200);

      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to save form',
      );
      return false;
    }
  };

  return {
    draft,

    isLoading,
    errorMessage,
    successMessage,

    setTitle,
    setDescription,

    addQuestion,
    updateQuestion,
    moveQuestion,
    removeQuestion,

    addOption,
    updateOption,
    removeOption,

    reset,
    saveForm,
  };
}
