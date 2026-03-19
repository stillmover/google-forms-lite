import type { DraftQuestion } from '../store/formsSlice'
import type { QuestionInput } from '../api/generated'
import { isChoiceQuestionType } from '../utils/questionType'

type CreateDraftInput = {
  title: string
  description: string
  questions: DraftQuestion[]
}

export type CreateFormPayload = {
  title: string
  description?: string
  questions: QuestionInput[]
}

export const validateCreateFormDraft = (draft: CreateDraftInput): string | null => {
  const normalizedTitle = draft.title.trim()
  if (!normalizedTitle) {
    return 'Please enter a form title.'
  }

  if (normalizedTitle.length < 3) {
    return 'Form title should contain at least 3 characters.'
  }

  if (draft.questions.length === 0) {
    return 'Please add at least one question.'
  }

  const invalidQuestionIndex = draft.questions.findIndex((question) => {
    if (!question.text.trim()) return true
    if (!isChoiceQuestionType(question.type)) return false
    return normalizeOptions(question.options).length === 0
  })

  if (invalidQuestionIndex >= 0) {
    return `Please complete question #${invalidQuestionIndex + 1}. Choice questions need at least one option.`
  }

  return null
}

export const normalizeOptions = (options: string[]) =>
  options.map((option) => option.trim()).filter(Boolean)

export const toCreateFormPayload = (draft: CreateDraftInput): CreateFormPayload => ({
  title: draft.title.trim(),
  description: draft.description.trim() || undefined,
  questions: draft.questions.map((question) => ({
    text: question.text.trim(),
    type: question.type,
    options: isChoiceQuestionType(question.type)
      ? normalizeOptions(question.options)
      : undefined,
  })),
})
