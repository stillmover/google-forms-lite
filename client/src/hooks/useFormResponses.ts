import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFormQuery, useResponsesQuery } from '../api/enhancedApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setResponsesForForm } from '../store/responsesSlice';

export function useFormResponses() {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();
  const formId = id;

  const {
    data: formData,
    isLoading: isFormLoading,
    isError: isFormError,
  } = useFormQuery({ id: formId }, { skip: !formId });

  const {
    data,
    isLoading,
    isError,
  } = useResponsesQuery(
    { formId },
    { skip: !formId },
  );

  useEffect(() => {
    if (data?.responses) {
      dispatch(setResponsesForForm({ formId, responses: data.responses }));
    }
  }, [data, dispatch, formId]);

  const storedResponses = useAppSelector(
    (state) => state.responses.byFormId[formId] ?? [],
  );

  const questionById = useMemo(() => {
    return new Map(
      (formData?.form?.questions ?? []).map((q) => [q.id, q]),
    );
  }, [formData]);

  return {
    formId,
    form: formData?.form,

    storedResponses,
    questionById,

    isLoading,
    isError,
    isFormLoading,
    isFormError,
  };
}