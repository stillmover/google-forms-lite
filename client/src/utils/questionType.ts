import type { QuestionType } from '../api/generated'

export const QUESTION_TYPE_OPTIONS: Array<{ value: QuestionType; label: string }> = [
  { value: 'TEXT', label: 'Text Input' },
  { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
  { value: 'CHECKBOX', label: 'Checkboxes' },
  { value: 'DATE', label: 'Date' },
] as const

export const isChoiceQuestionType = (type: QuestionType) =>
  type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX'
