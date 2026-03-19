import { api as generatedApi } from './generated'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    Forms: {
      providesTags: (result) =>
        result
          ? [
              ...result.forms.map((form) => ({ type: 'Forms' as const, id: form.id })),
              { type: 'Forms' as const, id: 'LIST' },
            ]
          : [{ type: 'Forms' as const, id: 'LIST' }],
    },
    Form: {
      providesTags: (_result, _error, arg) => [{ type: 'Forms', id: arg.id }],
    },
    Responses: {
      providesTags: (result, _error, arg) =>
        result
          ? [
              ...result.responses.map((response) => ({
                type: 'Responses' as const,
                id: response.id,
              })),
              { type: 'Responses' as const, id: `LIST-${arg.formId}` },
            ]
          : [{ type: 'Responses' as const, id: `LIST-${arg.formId}` }],
    },
    CreateForm: {
      invalidatesTags: [{ type: 'Forms', id: 'LIST' }],
    },
    SubmitResponse: {
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Responses', id: `LIST-${arg.formId}` },
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
