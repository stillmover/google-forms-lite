import type { FormsQuery } from '../../api/generated';
import { Link } from 'react-router-dom';

type Props = {
  form: FormsQuery['forms'][number];
};

export function FormListItem({ form }: Props) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{form.title}</h3>

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
  );
}
