import { api as generatedApi } from './generated'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    Forms: {
      providesTags: ['Forms'],
    },
    Form: {
      providesTags: (_result, _error, arg) => [{ type: 'Forms', id: arg.id }],
    },
    Responses: {
      providesTags: (_result, _error, arg) => [{ type: 'Responses', id: arg.formId }],
    },
    CreateForm: {
      invalidatesTags: ['Forms'],
    },
    SubmitResponse: {
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Responses', id: arg.formId },
      ],
    },
  },
})

export const {
  useFormsQuery,
  useFormQuery,
  useResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = api
