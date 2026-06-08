"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitResponse = void 0;
const uuid_1 = require("uuid");
const db_1 = require("../../../db");
const submitResponse = async (_parent, { formId, answers }) => {
    const form = db_1.db.forms.find(f => f.id === formId);
    if (!form)
        throw new Error(`Form with id "${formId}" not found`);
    const newResponse = {
        id: (0, uuid_1.v4)(),
        formId,
        answers: answers
            .filter(a => a != null)
            .map(({ questionId, value }) => ({
            questionId,
            value,
        })),
    };
    db_1.db.responses.push(newResponse);
    return newResponse;
};
exports.submitResponse = submitResponse;
