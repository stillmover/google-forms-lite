import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

type GraphqlQueryArgs = {
  document: string | { toString(): string }
  variables?: Record<string, unknown> | void
}

const rawGraphqlBaseQuery = graphqlRequestBaseQuery({
  url: import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql',
})

const graphqlBaseQuery: BaseQueryFn<GraphqlQueryArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) =>
  rawGraphqlBaseQuery(
    {
      document: args.document.toString(),
      variables: args.variables,
    },
    api,
    extraOptions,
  )

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery,
  tagTypes: ['Forms', 'Responses'],
  endpoints: () => ({}),
})
