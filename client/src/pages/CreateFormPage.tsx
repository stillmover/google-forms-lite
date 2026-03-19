import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { QuestionInput, QuestionType } from '../api/generated'
import { useCreateFormMutation } from '../api/enhancedApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addDraftQuestion,
  addDraftQuestionOption,
  moveDraftQuestion,
  removeDraftQuestion,
  removeDraftQuestionOption,
  resetCreateDraft,
  updateCreateDraft,
  updateDraftQuestion,
  updateDraftQuestionOption,
} from '../store/formsSlice'

const questionTypeOptions: Array<{ value: QuestionType; label: string }> = [
  { value: 'TEXT', label: 'Text Input' },
  { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
  { value: 'CHECKBOX', label: 'Checkboxes' },
  { value: 'DATE', label: 'Date' },
]

const supportsOptions = (type: QuestionType) =>
  type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX'

export function CreateFormPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const draft = useAppSelector((state) => state.forms.createDraft)
  const [createForm, { isLoading }] = useCreateFormMutation()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSave = async () => {
    setErrorMessage(null)

    const title = draft.title.trim()
    if (!title) {
      setErrorMessage('Form title is required.')
      return
    }

    const hasInvalidQuestions = draft.questions.some((question) => {
      if (!question.text.trim()) return true
      if (!supportsOptions(question.type)) return false
      return question.options.map((option) => option.trim()).filter(Boolean).length === 0
    })

    if (hasInvalidQuestions) {
      setErrorMessage('Each question needs text, and choice questions need options.')
      return
    }

    const questions: QuestionInput[] = draft.questions.map((question) => ({
      text: question.text.trim(),
      type: question.type,
      options: supportsOptions(question.type)
        ? question.options.map((option) => option.trim()).filter(Boolean)
        : undefined,
    }))

    try {
      await createForm({
        title,
        description: draft.description.trim() || undefined,
        questions,
      }).unwrap()
      dispatch(resetCreateDraft())
      navigate('/')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save form.')
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Create New Form</h2>

        <div className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium text-slate-700">Form Title</span>
            <input
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              value={draft.title}
              onChange={(event) =>
                dispatch(updateCreateDraft({ title: event.target.value }))
              }
              placeholder="e.g. Employee Feedback Survey"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium text-slate-700">Description</span>
            <textarea
              className="min-h-20 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              value={draft.description}
              onChange={(event) =>
                dispatch(updateCreateDraft({ description: event.target.value }))
              }
              placeholder="Describe the purpose of this form"
            />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Questions</h3>
          <div className="flex gap-2">
            {questionTypeOptions.map((typeOption) => (
              <button
                key={typeOption.value}
                className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
                onClick={() =>
                  dispatch(
                    addDraftQuestion({
                      id: crypto.randomUUID(),
                      type: typeOption.value,
                    }),
                  )
                }
                type="button"
              >
                + {typeOption.label}
              </button>
            ))}
          </div>
        </div>

        {draft.questions.length === 0 ? (
          <p className="text-slate-600">No questions yet. Add one to start.</p>
        ) : (
          <ul className="space-y-3">
            {draft.questions.map((question, index) => (
              <li key={question.id} className="rounded-lg border border-slate-200 p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="grid flex-1 gap-2">
                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-slate-700">
                        Question {index + 1}
                      </span>
                      <input
                        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        value={question.text}
                        onChange={(event) =>
                          dispatch(
                            updateDraftQuestion({
                              id: question.id,
                              patch: { text: event.target.value },
                            }),
                          )
                        }
                        placeholder="Question text"
                      />
                    </label>

                    <label className="grid gap-1">
                      <span className="text-sm font-medium text-slate-700">Type</span>
                      <select
                        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        value={question.type}
                        onChange={(event) =>
                          dispatch(
                            updateDraftQuestion({
                              id: question.id,
                              patch: { type: event.target.value as QuestionType },
                            }),
                          )
                        }
                      >
                        {questionTypeOptions.map((typeOption) => (
                          <option key={typeOption.value} value={typeOption.value}>
                            {typeOption.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200"
                      onClick={() =>
                        dispatch(moveDraftQuestion({ id: question.id, direction: 'up' }))
                      }
                      type="button"
                    >
                      Up
                    </button>
                    <button
                      className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200"
                      onClick={() =>
                        dispatch(moveDraftQuestion({ id: question.id, direction: 'down' }))
                      }
                      type="button"
                    >
                      Down
                    </button>
                    <button
                      className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-700 hover:bg-red-200"
                      onClick={() => dispatch(removeDraftQuestion(question.id))}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {supportsOptions(question.type) && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700">Options</p>
                      <button
                        className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200"
                        onClick={() => dispatch(addDraftQuestionOption(question.id))}
                        type="button"
                      >
                        + Add Option
                      </button>
                    </div>
                    {question.options.map((option, optionIndex) => (
                      <div key={`${question.id}-${optionIndex}`} className="flex gap-2">
                        <input
                          className="flex-1 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                          value={option}
                          onChange={(event) =>
                            dispatch(
                              updateDraftQuestionOption({
                                id: question.id,
                                optionIndex,
                                value: event.target.value,
                              }),
                            )
                          }
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        <button
                          className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-700 hover:bg-red-200"
                          onClick={() =>
                            dispatch(
                              removeDraftQuestionOption({
                                id: question.id,
                                optionIndex,
                              }),
                            )
                          }
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {errorMessage && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200"
          onClick={() => dispatch(resetCreateDraft())}
          type="button"
        >
          Reset
        </button>
        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          onClick={() => void handleSave()}
          type="button"
        >
          {isLoading ? 'Saving...' : 'Save Form'}
        </button>
      </div>
    </div>
  )
}
