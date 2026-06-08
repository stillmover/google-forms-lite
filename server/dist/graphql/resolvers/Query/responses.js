"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = void 0;
const db_1 = require("../../../db");
const responses = async (_parent, { formId }) => {
    return db_1.db.responses.filter(r => r.formId === formId);
};
exports.responses = responses;
