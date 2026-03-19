import { useAppSelector } from '../store/hooks'

export function CreateFormPage() {
  const draft = useAppSelector((state) => state.forms.createDraft)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Create New Form</h2>
      <p className="text-slate-600">
        Draft state is managed in Redux Toolkit and ready for form builder UI.
      </p>
      <pre className="mt-4 overflow-auto rounded-md bg-slate-900 p-3 text-sm text-slate-100">
        {JSON.stringify(draft, null, 2)}
      </pre>
    </section>
  )
}
