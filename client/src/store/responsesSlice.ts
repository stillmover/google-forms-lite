import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ResponsesQuery } from '../api/generated'

export type ResponseListItem = ResponsesQuery['responses'][number]

type ResponsesState = {
  byFormId: Record<string, ResponseListItem[]>
  currentResponsesFormId: string | null
}

const initialState: ResponsesState = {
  byFormId: {},
  currentResponsesFormId: null,
}

const responsesSlice = createSlice({
  name: 'responses',
  initialState,
  reducers: {
    setResponsesForForm: (
      state,
      action: PayloadAction<{ formId: string; responses: ResponseListItem[] }>,
    ) => {
      state.byFormId[action.payload.formId] = action.payload.responses
    },
    setCurrentResponsesFormId: (state, action: PayloadAction<string | null>) => {
      state.currentResponsesFormId = action.payload
    },
  },
})

export const { setResponsesForForm, setCurrentResponsesFormId } =
  responsesSlice.actions
export const responsesReducer = responsesSlice.reducer
