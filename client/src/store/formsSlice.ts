import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FormsQuery, QuestionType } from '../api/generated'
import { isChoiceQuestionType, QUESTION_TYPE_OPTIONS } from '../utils/questionType'

export type FormListItem = FormsQuery['forms'][number]

export type DraftQuestion = {
  id: string
  text: string
  type: QuestionType
  options: string[]
}

type CreateFormDraft = {
  title: string
  description: string
  questions: DraftQuestion[]
}

type FormsState = {
  createDraft: CreateFormDraft
}

const initialState: FormsState = {
  createDraft: {
    title: '',
    description: '',
    questions: [],
  },
}

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    updateCreateDraft: (state, action: PayloadAction<Partial<CreateFormDraft>>) => {
      state.createDraft = {
        ...state.createDraft,
        ...action.payload,
      }
    },
    addDraftQuestion: (
      state,
      action: PayloadAction<{ id: string; type?: QuestionType }>,
    ) => {
      const validTypes = QUESTION_TYPE_OPTIONS.map(option => option.value);

      const type =
        action.payload.type && validTypes.includes(action.payload.type)
          ? action.payload.type
          : 'TEXT'
      state.createDraft.questions.push({
        id: action.payload.id,
        text: '',
        type,
        options: isChoiceQuestionType(type) ? [''] : [],
      })
    },
    removeDraftQuestion: (state, action: PayloadAction<string>) => {
      state.createDraft.questions = state.createDraft.questions.filter(
        (question) => question.id !== action.payload,
      )
    },
    moveDraftQuestion: (
      state,
      action: PayloadAction<{ id: string; direction: 'up' | 'down' }>,
    ) => {
      const currentIndex = state.createDraft.questions.findIndex(
        (question) => question.id === action.payload.id,
      )
      if (currentIndex === -1) return

      const targetIndex =
        action.payload.direction === 'up' ? currentIndex - 1 : currentIndex + 1

      if (targetIndex < 0 || targetIndex >= state.createDraft.questions.length) {
        return
      }

      const [item] = state.createDraft.questions.splice(currentIndex, 1)
      state.createDraft.questions.splice(targetIndex, 0, item)
    },
    updateDraftQuestion: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<DraftQuestion> }>,
    ) => {
      const question = state.createDraft.questions.find(
        (item) => item.id === action.payload.id,
      )
      if (!question) return

      const nextType = action.payload.patch.type ?? question.type
      question.text = action.payload.patch.text ?? question.text
      question.type = nextType
      if (isChoiceQuestionType(nextType)) {
        question.options =
          action.payload.patch.options?.slice() ??
          (question.options.length > 0 ? question.options : [''])
      } else {
        question.options = []
      }
    },
    addDraftQuestionOption: (state, action: PayloadAction<string>) => {
      const question = state.createDraft.questions.find(
        (item) => item.id === action.payload,
      )
      if (!question || !isChoiceQuestionType(question.type)) return
      question.options.push('')
    },
    updateDraftQuestionOption: (
      state,
      action: PayloadAction<{ id: string; optionIndex: number; value: string }>,
    ) => {
      const question = state.createDraft.questions.find(
        (item) => item.id === action.payload.id,
      )
      if (!question || !isChoiceQuestionType(question.type)) return
      question.options[action.payload.optionIndex] = action.payload.value
    },
    removeDraftQuestionOption: (
      state,
      action: PayloadAction<{ id: string; optionIndex: number }>,
    ) => {
      const question = state.createDraft.questions.find(
        (item) => item.id === action.payload.id,
      )
      if (!question || !isChoiceQuestionType(question.type)) return
      question.options.splice(action.payload.optionIndex, 1)
      if (question.options.length === 0) {
        question.options.push('')
      }
    },
    resetCreateDraft: (state) => {
      state.createDraft = initialState.createDraft
    },
  },
})

export const {
  updateCreateDraft,
  addDraftQuestion,
  removeDraftQuestion,
  moveDraftQuestion,
  updateDraftQuestion,
  addDraftQuestionOption,
  updateDraftQuestionOption,
  removeDraftQuestionOption,
  resetCreateDraft,
} = formsSlice.actions
export const formsReducer = formsSlice.reducer
