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
  if (!draft.title.trim()) {
    return 'Form title is required.'
  }

  const hasInvalidQuestions = draft.questions.some((question) => {
    if (!question.text.trim()) return true
    if (!isChoiceQuestionType(question.type)) return false
    return normalizeOptions(question.options).length === 0
  })

  if (hasInvalidQuestions) {
    return 'Each question needs text, and choice questions need options.'
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
