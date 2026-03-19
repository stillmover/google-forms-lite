import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useFormQuery,
  useSubmitResponseMutation,
  type AnswerInput,
  type QuestionType,
} from '../api/generated'

type AnswersState = Record<string, string | string[]>

const isChoiceType = (type: QuestionType) =>
  type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX'

export function FormFillPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError } = useFormQuery({ id }, { skip: id.length === 0 })
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation()
  const [answers, setAnswers] = useState<AnswersState>({})
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null,
  )

  const form = data?.form

  const preparedAnswers = useMemo<AnswerInput[]>(() => {
    if (!form) return []
    return form.questions.flatMap((question) => {
      const raw = answers[question.id]
      if (Array.isArray(raw)) {
        return raw
          .map((value) => value.trim())
          .filter(Boolean)
          .map((value) => ({ questionId: question.id, value }))
      }
      const value = (raw ?? '').trim()
      return value ? [{ questionId: question.id, value }] : []
    })
  }, [answers, form])

  const handleTextLikeChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    setAnswers((prev) => {
      const current = prev[questionId]
      const currentArray = Array.isArray(current) ? current : []
      const next = checked
        ? Array.from(new Set([...currentArray, option]))
        : currentArray.filter((value) => value !== option)
      return { ...prev, [questionId]: next }
    })
  }

  const handleSubmit = async () => {
    setFeedback(null)
    if (!form) return

    if (preparedAnswers.length === 0) {
      setFeedback({
        type: 'error',
        text: 'Please answer at least one question before submitting.',
      })
      return
    }

    try {
      await submitResponse({
        formId: form.id,
        answers: preparedAnswers,
      }).unwrap()
      setFeedback({ type: 'success', text: 'Form submitted successfully!' })
      setAnswers({})
    } catch (error) {
      setFeedback({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to submit form.',
      })
    }
  }

  if (isLoading) {
    return <p className="text-slate-600">Loading form...</p>
  }

  if (isError || !form) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        Failed to load form.
      </p>
    )
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{form.title}</h2>
        <p className="mt-1 text-slate-600">{form.description ?? 'No description'}</p>
      </div>

      {form.questions.map((question, index) => (
        <div key={question.id} className="rounded-lg border border-slate-200 p-4">
          <p className="mb-2 font-medium text-slate-900">
            {index + 1}. {question.text}
          </p>

          {question.type === 'TEXT' && (
            <input
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              value={typeof answers[question.id] === 'string' ? answers[question.id] : ''}
              onChange={(event) => handleTextLikeChange(question.id, event.target.value)}
              placeholder="Type your answer"
            />
          )}

          {question.type === 'DATE' && (
            <input
              aria-label={`${question.text} date`}
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              type="date"
              value={typeof answers[question.id] === 'string' ? answers[question.id] : ''}
              onChange={(event) => handleTextLikeChange(question.id, event.target.value)}
            />
          )}

          {question.type === 'MULTIPLE_CHOICE' && (
            <div className="space-y-2">
              {(question.options ?? [])
                .filter((opt): opt is string => typeof opt === 'string')
                .map((option) => (
                  <label key={option} className="flex items-center gap-2 text-slate-700">
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === option}
                      onChange={() => handleTextLikeChange(question.id, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
            </div>
          )}

          {question.type === 'CHECKBOX' && (
            <div className="space-y-2">
              {(question.options ?? [])
                .filter((opt): opt is string => typeof opt === 'string')
                .map((option) => (
                  <label key={option} className="flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      checked={
                        Array.isArray(answers[question.id]) &&
                        answers[question.id].includes(option)
                      }
                      onChange={(event) =>
                        handleCheckboxChange(question.id, option, event.target.checked)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
            </div>
          )}

          {!isChoiceType(question.type) && (
            <p className="mt-2 text-xs text-slate-500">Question type: {question.type}</p>
          )}
        </div>
      ))}

      {feedback && (
        <p
          className={`rounded-md px-3 py-2 text-sm ${
            feedback.type === 'success'
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {feedback.text}
        </p>
      )}

      <div className="flex justify-end">
        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          onClick={() => void handleSubmit()}
          type="button"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </section>
  )
}
