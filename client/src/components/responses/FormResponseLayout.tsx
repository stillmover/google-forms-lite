import { EmptyState } from '../../ui/AsyncState';
import { ResponseItem } from './ResponseItem';
import type { FormQuery } from '../../api/generated';
import type { ResponsesQuery } from '../../api/generated';


type QuestionByIdItem = NonNullable<FormQuery['form']>['questions'][number];
type ResponseListItem = ResponsesQuery['responses'][number];
type Props = {
  form?: FormQuery['form'];
  formId: string;
  storedResponses: ResponseListItem[];
  questionById: Map<string, QuestionByIdItem>;
};

export function FormResponsesLayout({
  form,
  formId,
  storedResponses,
  questionById,
}: Props) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Form Responses</h2>
        <p className="text-slate-600">{form?.title ?? `Form id: ${formId}`}</p>
      </div>

      {storedResponses.length === 0 ? (
        <EmptyState message="No responses submitted yet." />
      ) : (
        <ul className="space-y-3">
          {storedResponses.map((response, i) => (
            <ResponseItem
              key={response.id}
              response={response}
              index={i}
              questionById={questionById}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
