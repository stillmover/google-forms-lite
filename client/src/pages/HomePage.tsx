import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormsQuery } from '../api/enhancedApi';
import { useAppDispatch } from '../store/hooks';
import { setForms } from '../store/formsSlice';
import { EmptyState, LoadingState } from '../ui/AsyncState';
import { Toast } from '../ui/Toast';

export function HomePage() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error, refetch } = useFormsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.forms) {
      dispatch(setForms(data.forms));
    }
  }, [data, dispatch]);

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

  const forms = data?.forms ?? [];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">All forms</h2>

      {forms.length === 0 ? (
        <EmptyState message="No forms yet. Create your first one." />
      ) : (
        <ul className="space-y-3">
          {forms.map(form => (
            <li
              key={form.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {form.title}
              </h3>
              <p className="mt-1 text-slate-600">
                {form.description ?? 'No description'}
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
                  to={`/forms/${form.id}/fill`}
                >
                  Fill Form
                </Link>
                <Link
                  className="rounded-md bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200"
                  to={`/forms/${form.id}/responses`}
                >
                  View Responses
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
