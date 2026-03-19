import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useResponsesQuery } from '../api/generated'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setCurrentResponsesFormId,
  setResponsesForForm,
} from '../store/responsesSlice'

export function FormResponsesPage() {
  const dispatch = useAppDispatch()
  const { formId = '' } = useParams()
  const { data, isLoading, isError } = useResponsesQuery(
    { formId },
    { skip: formId.length === 0 },
  )

  useEffect(() => {
    dispatch(setCurrentResponsesFormId(formId))
    if (data?.responses) {
      dispatch(setResponsesForForm({ formId, responses: data.responses }))
    }
  }, [data, dispatch, formId])

  const storedResponses = useAppSelector(
    (state) => state.responses.byFormId[formId] ?? [],
  )

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Form Responses</h2>
      <p className="mb-4 text-slate-600">Form id: {formId}</p>

      {isLoading && <p className="text-slate-600">Loading responses...</p>}
      {isError && <p className="text-red-600">Failed to load responses.</p>}

      {!isLoading && !isError && (
        <p className="text-slate-700">
          Responses loaded: {storedResponses.length}
        </p>
      )}
    </section>
  )
}
