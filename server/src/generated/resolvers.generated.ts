/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { form as Query_form } from './../graphql/resolvers/Query/form';
import    { forms as Query_forms } from './../graphql/resolvers/Query/forms';
import    { responses as Query_responses } from './../graphql/resolvers/Query/responses';
import    { createForm as Mutation_createForm } from './../graphql/resolvers/Mutation/createForm';
import    { submitResponse as Mutation_submitResponse } from './../graphql/resolvers/Mutation/submitResponse';
    export const resolvers: Resolvers = {
      Query: { form: Query_form,forms: Query_forms,responses: Query_responses },
      Mutation: { createForm: Mutation_createForm,submitResponse: Mutation_submitResponse },
      
      
    }