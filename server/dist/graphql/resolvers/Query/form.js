"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.form = void 0;
const db_1 = require("../../../db");
const question_1 = require("../utils/question");
const form = async (_parent, { id }) => {
    const found = db_1.db.forms.find(f => f.id === id);
    if (!found)
        return undefined;
    return {
        ...found,
        questions: found.questions.map(q => ({
            ...q,
            type: (0, question_1.normalizeQuestionType)(q.type),
        })),
    };
};
exports.form = form;
