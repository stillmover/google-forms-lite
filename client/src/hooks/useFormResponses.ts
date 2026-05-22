import { useParams } from 'react-router-dom';
import { useFormQuery, useResponsesQuery } from '../api/enhancedApi';

export function useFormResponses() {
  const { id = '' } = useParams();

  const {
    data: formData,
    isLoading: isFormLoading,
    isError: isFormError,
  } = useFormQuery({ id }, { skip: !id });

  const { data, isLoading, isError } = useResponsesQuery(
    { formId: id },
    { skip: !id },
  );

  const questionById = new Map(
    (formData?.form?.questions ?? []).map(q => [q.id, q]),
  );

  return {
    formId: id,
    form: formData?.form,
    storedResponses: data?.responses ?? [],
    questionById,
    isLoading,
    isError,
    isFormLoading,
    isFormError,
  };
}