import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FormsQuery } from '../api/generated'

export type FormListItem = FormsQuery['forms'][number]

type CreateFormDraft = {
  title: string
  description: string
}

type FormsState = {
  list: FormListItem[]
  currentFormId: string | null
  createDraft: CreateFormDraft
}

const initialState: FormsState = {
  list: [],
  currentFormId: null,
  createDraft: {
    title: '',
    description: '',
  },
}

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<FormListItem[]>) => {
      state.list = action.payload
    },
    setCurrentFormId: (state, action: PayloadAction<string | null>) => {
      state.currentFormId = action.payload
    },
    updateCreateDraft: (state, action: PayloadAction<Partial<CreateFormDraft>>) => {
      state.createDraft = {
        ...state.createDraft,
        ...action.payload,
      }
    },
    resetCreateDraft: (state) => {
      state.createDraft = initialState.createDraft
    },
  },
})

export const { setForms, setCurrentFormId, updateCreateDraft, resetCreateDraft } =
  formsSlice.actions
export const formsReducer = formsSlice.reducer
