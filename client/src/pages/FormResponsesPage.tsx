import { LoadingState, ErrorState } from '../ui/AsyncState';
import { useFormResponses } from '../hooks/useFormResponses';
import { FormResponsesLayout } from '../components/rensponses/FormResponseLayout';

export function FormResponsesPage() {
  const state = useFormResponses();

  if (state.isLoading || state.isFormLoading) {
    return <LoadingState message="Loading responses..." />;
  }

  if (state.isError || state.isFormError) {
    return <ErrorState message="Failed to load responses." />;
  }

  return <FormResponsesLayout {...state} />;
}
