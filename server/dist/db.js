"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mockForms = [
    {
        id: 'form-1',
        title: 'Customer Satisfaction Survey',
        description: 'Quick feedback after service.',
        questions: [
            {
                id: 'q-1',
                text: 'How satisfied are you with our service?',
                type: 'MULTIPLE_CHOICE',
                options: ['Very satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'],
            },
            {
                id: 'q-2',
                text: 'What can we improve?',
                type: 'TEXT',
                options: null,
            },
        ],
    },
    {
        id: 'form-2',
        title: 'Event Registration',
        description: 'Collect attendee information.',
        questions: [
            {
                id: 'q-3',
                text: 'Your full name',
                type: 'TEXT',
                options: null,
            },
            {
                id: 'q-4',
                text: 'Preferred workshop track',
                type: 'CHECKBOX',
                options: ['Frontend', 'Backend', 'DevOps'],
            },
            {
                id: 'q-5',
                text: 'Need a certificate?',
                type: 'MULTIPLE_CHOICE',
                options: ['Yes', 'No'],
            },
        ],
    },
];
const mockResponses = [
    {
        id: 'resp-1',
        formId: 'form-1',
        answers: [
            { questionId: 'q-1', value: ['Satisfied'] },
            { questionId: 'q-2', value: ['Faster support replies'] },
        ],
    },
    {
        id: 'resp-2',
        formId: 'form-2',
        answers: [
            { questionId: 'q-3', value: ['John Doe'] },
            { questionId: 'q-4', value: ['Frontend', 'DevOps'] },
            { questionId: 'q-5', value: ['Yes'] },
        ],
    },
];
exports.db = {
    forms: mockForms,
    responses: mockResponses,
};
