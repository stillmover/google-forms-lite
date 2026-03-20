import { useFormFill } from '../hooks/useFormFill';
import { ErrorState, LoadingState } from '../ui/AsyncState';
import { FormFillLayout } from '../components/form-fill/FormFillLayout';

export function FormFillPage() {
  const state = useFormFill();

  if (state.isLoading) return <LoadingState message="Loading form..." />;
  if (state.isError || !state.form)
    return <ErrorState message="Failed to load form." />;

  const { form, ...rest } = state;

  return <FormFillLayout form={form} {...rest} />;
}
