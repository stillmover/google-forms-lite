import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ResponsesQuery } from '../api/generated'

export type ResponseListItem = ResponsesQuery['responses'][number]

type ResponsesState = {
  byFormId: Record<string, ResponseListItem[]>
}

const initialState: ResponsesState = {
  byFormId: {},
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
  },
})

export const { setResponsesForForm } = responsesSlice.actions
export const responsesReducer = responsesSlice.reducer
