import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFormQuery, useResponsesQuery } from '../api/enhancedApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setCurrentResponsesFormId,
  setResponsesForForm,
} from '../store/responsesSlice'
import { EmptyState, ErrorState, LoadingState } from '../ui/AsyncState'

export function FormResponsesPage() {
  const dispatch = useAppDispatch()
  const { id = '' } = useParams()
  const formId = id

  const {
    data: formData,
    isLoading: isFormLoading,
    isError: isFormError,
  } = useFormQuery({ id: formId }, { skip: formId.length === 0 })
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
  const questionById = new Map(
    (formData?.form?.questions ?? []).map((question) => [question.id, question]),
  )

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Form Responses</h2>
        <p className="text-slate-600">
          {formData?.form?.title ?? `Form id: ${formId}`}
        </p>
      </div>

      {(isLoading || isFormLoading) && (
        <LoadingState message="Loading responses..." />
      )}

      {(isError || isFormError) && (
        <ErrorState message="Failed to load responses." />
      )}

      {!isLoading && !isError && !isFormLoading && !isFormError && (
        <>
          {storedResponses.length === 0 ? (
            <EmptyState message="No responses submitted yet." />
          ) : (
            <ul className="space-y-3">
              {storedResponses.map((response, responseIndex) => (
                <li
                  key={response.id}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    Submission #{responseIndex + 1}
                  </p>
                  <ul className="space-y-2">
                    {response.answers.map((answer, answerIndex) => {
                      const question = questionById.get(answer.questionId)
                      return (
                        <li
                          key={`${response.id}-${answer.questionId}-${answerIndex}`}
                          className="rounded-md bg-slate-50 px-3 py-2"
                        >
                          <p className="text-sm font-medium text-slate-800">
                            {question?.text ?? `Question ${answer.questionId}`}
                          </p>
                          <p className="text-slate-700">{answer.value}</p>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}
