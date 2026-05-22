import type { FormQuery } from '../../api/generated';
import type { ResponsesQuery } from '../../api/generated';

type ResponseListItem = ResponsesQuery['responses'][number];

type QuestionItem = NonNullable<FormQuery['form']>['questions'][number];
type Props = {
  response: ResponseListItem;
  index: number;
  questionById: Map<string, QuestionItem>;
};

export function ResponseItem({ response, index, questionById }: Props) {
  return (
    <li className="rounded-lg border border-slate-200 p-4">
      <p className="mb-3 text-sm font-medium text-slate-700">
        Submission #{index + 1}
      </p>

      <ul className="space-y-2">
        {response.answers.map((answer, i) => {
          const question = questionById.get(answer.questionId);

          return (
            <li
              key={`${response.id}-${answer.questionId}-${i}`}
              className="rounded-md bg-slate-50 px-3 py-2"
            >
              <p className="text-sm font-medium text-slate-800">
                {question?.text ?? `Question ${answer.questionId}`}
              </p>
              <p className="text-slate-700">{answer.value}</p>
            </li>
          );
        })}
      </ul>
    </li>
  );
}