"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForm = void 0;
const db_1 = require("../../../db");
const uuid_1 = require("uuid");
const question_1 = require("../utils/question");
const createForm = async (_parent, { title, description, questions }) => {
    const safeQuestions = questions ?? [];
    const newForm = {
        id: (0, uuid_1.v4)(),
        title,
        description: description ?? null,
        questions: safeQuestions
            .filter(q => q != null)
            .map(q => ({
            id: (0, uuid_1.v4)(),
            text: q.text,
            type: (0, question_1.normalizeQuestionType)(q.type),
            options: Array.isArray(q.options)
                ? q.options.filter(opt => typeof opt === 'string')
                : null,
        })),
    };
    db_1.db.forms.push(newForm);
    return newForm;
};
exports.createForm = createForm;
