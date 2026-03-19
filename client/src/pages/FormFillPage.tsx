import { isChoiceType, useFormFill } from '../hooks/useFormFill'

export function FormFillPage() {
  const {
    form,
    isLoading,
    isError,
    isSubmitting,
    feedback,
    getTextAnswer,
    isChecked,
    setTextAnswer,
    setCheckboxAnswer,
    submit,
  } = useFormFill()

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
              value={getTextAnswer(question.id)}
              onChange={(event) => setTextAnswer(question.id, event.target.value)}
              placeholder="Type your answer"
            />
          )}

          {question.type === 'DATE' && (
            <input
              aria-label={`${question.text} date`}
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              type="date"
              value={getTextAnswer(question.id)}
              onChange={(event) => setTextAnswer(question.id, event.target.value)}
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
                      checked={getTextAnswer(question.id) === option}
                      onChange={() => setTextAnswer(question.id, option)}
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
                      checked={isChecked(question.id, option)}
                      onChange={(event) =>
                        setCheckboxAnswer(question.id, option, event.target.checked)
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
          onClick={() => void submit()}
          type="button"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </section>
  )
}
