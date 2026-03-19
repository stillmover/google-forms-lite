import { Form, QuestionType, Response } from '@gfl/shared'

const mockForms: Form[] = [
  {
    id: 'form-1',
    title: 'Customer Satisfaction Survey',
    description: 'Quick feedback after service.',
    questions: [
      {
        id: 'q-1',
        text: 'How satisfied are you with our service?',
        type: QuestionType.MultipleChoice,
        options: ['Very satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'],
      },
      {
        id: 'q-2',
        text: 'What can we improve?',
        type: QuestionType.Text,
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
        type: QuestionType.Text,
        options: null,
      },
      {
        id: 'q-4',
        text: 'Preferred workshop track',
        type: QuestionType.MultipleChoice,
        options: ['Frontend', 'Backend', 'DevOps'],
      },
      {
        id: 'q-5',
        text: 'Need a certificate?',
        type: QuestionType.Checkbox,
        options: ['Yes'],
      },
    ],
  },
]

const mockResponses: Response[] = [
  {
    id: 'resp-1',
    formId: 'form-1',
    answers: [
      { questionId: 'q-1', value: 'Satisfied' },
      { questionId: 'q-2', value: 'Faster support replies' },
    ],
  },
]

export const db = {
  forms: mockForms,
  responses: mockResponses,
};
