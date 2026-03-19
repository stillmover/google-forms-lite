import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormsQuery } from '../api/enhancedApi';
import { useAppDispatch } from '../store/hooks';
import { setCurrentFormId, setForms } from '../store/formsSlice';
import { setCurrentResponsesFormId } from '../store/responsesSlice';

export function HomePage() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error, refetch } = useFormsQuery();

  useEffect(() => {
    if (data?.forms) {
      dispatch(setForms(data.forms));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <p className="text-slate-600">Loading forms...</p>;
  }

  if (isError) {
    return (
      <div className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        <p>Failed to load forms.</p>
        <p className="text-sm">{JSON.stringify(error)}</p>
        <button
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  const forms = data?.forms ?? [];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">All forms</h2>

      {forms.length === 0 ? (
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-slate-600">
          No forms yet. Create your first one.
        </p>
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
                  onClick={() => dispatch(setCurrentFormId(form.id))}
                >
                  Fill Form
                </Link>
                <Link
                  className="rounded-md bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200"
                  to={`/forms/${form.id}/responses`}
                  onClick={() => dispatch(setCurrentResponsesFormId(form.id))}
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
