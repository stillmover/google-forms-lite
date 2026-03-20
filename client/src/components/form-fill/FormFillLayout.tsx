import { Link } from 'react-router-dom';
import { Button, Toast } from '../../ui';
import { QuestionItem } from './QuestionItem';
import type { FormQuery } from '../../api/generated';
import { useFormFill } from '../../hooks/useFormFill';

type Form = NonNullable<FormQuery['form']>;
type Question = Form['questions'][number];

type Handlers = Pick<
  ReturnType<typeof useFormFill>,
  'getTextAnswer' | 'setTextAnswer' | 'isChecked' | 'setCheckboxAnswer'
>;

type Props = {
  form: Form;
  formId: string;
  isSubmitting: boolean;
  feedback: ReturnType<typeof useFormFill>['feedback'];
  submit: () => void;
} & Handlers;

export function FormFillLayout({
  form,
  formId,
  isSubmitting,
  feedback,
  submit,

  getTextAnswer,
  setTextAnswer,
  isChecked,
  setCheckboxAnswer,
}: Props) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{form.title}</h2>
        <p className="mt-1 text-slate-600">
          {form.description ?? 'No description'}
        </p>
      </div>

      {form.questions.map((q: Question, i: number) => (
        <QuestionItem
          key={q.id}
          question={q}
          index={i}
          getTextAnswer={getTextAnswer}
          setTextAnswer={setTextAnswer}
          isChecked={isChecked}
          setCheckboxAnswer={setCheckboxAnswer}
        />
      ))}

      {feedback && (
        <>
          <Toast type={feedback.type} message={feedback.text} />

          {feedback.type === 'success' && (
            <Link
              className="inline-block text-sm text-slate-700 underline"
              to={`/forms/${formId}/responses`}
            >
              View responses
            </Link>
          )}
        </>
      )}

      <div className="flex justify-end">
        <Button disabled={isSubmitting} onClick={() => void submit()}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </section>
  );
}
