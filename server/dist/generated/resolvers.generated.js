"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const form_1 = require("./../graphql/resolvers/Query/form");
const forms_1 = require("./../graphql/resolvers/Query/forms");
const responses_1 = require("./../graphql/resolvers/Query/responses");
const createForm_1 = require("./../graphql/resolvers/Mutation/createForm");
const submitResponse_1 = require("./../graphql/resolvers/Mutation/submitResponse");
exports.resolvers = {
    Query: { form: form_1.form, forms: forms_1.forms, responses: responses_1.responses },
    Mutation: { createForm: createForm_1.createForm, submitResponse: submitResponse_1.submitResponse },
};
