"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeQuestionType = void 0;
const VALID_TYPES = new Set([
    'TEXT',
    'MULTIPLE_CHOICE',
    'CHECKBOX',
    'DATE',
]);
const normalizeQuestionType = (type) => VALID_TYPES.has(type) ? type : 'TEXT';
exports.normalizeQuestionType = normalizeQuestionType;
