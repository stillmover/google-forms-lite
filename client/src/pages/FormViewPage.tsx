import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export function FormViewPage() {
  const { formId = '' } = useParams()
  const form = useAppSelector((state) =>
    state.forms.list.find((item) => item.id === formId),
  )

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-slate-900">View Form</h2>
      <p className="text-slate-600">
        {form ? `Selected form: ${form.title}` : `Form id: ${formId}`}
      </p>
    </section>
  )
}
