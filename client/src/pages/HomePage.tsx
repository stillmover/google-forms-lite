import { FormsList } from '../components/forms-list/FormsList';
import { EmptyState, LoadingState } from '../ui/AsyncState';
import { Toast } from '../ui/Toast';
import { useHomePage } from '../hooks/useHomePage';

export function HomePage() {
  const { forms, isLoading, isError, error, refetch } = useHomePage();

  if (isLoading) {
    return <LoadingState message="Loading forms..." />;
  }

  if (isError) {
    return (
      <Toast
        type="error"
        message={`Failed to load forms. ${JSON.stringify(error)}`}
        actionLabel="Retry"
        onAction={() => refetch()}
      />
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">All forms</h2>

      {forms.length === 0 ? (
        <EmptyState message="No forms yet. Create your first one." />
      ) : (
        <FormsList forms={forms} />
      )}
    </section>
  );
}