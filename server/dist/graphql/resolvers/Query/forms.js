"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forms = void 0;
const db_1 = require("../../../db");
const question_1 = require("../utils/question");
const forms = async () => {
    return db_1.db.forms.map(form => ({
        ...form,
        questions: form.questions.map(q => ({
            ...q,
            type: (0, question_1.normalizeQuestionType)(q.type),
        })),
    }));
};
exports.forms = forms;
