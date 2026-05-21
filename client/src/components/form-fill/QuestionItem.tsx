import { useFormFill } from '../../hooks/useFormFill';
import { Input } from '../../ui';
import type { FormQuery } from '../../api/generated';

type Question = NonNullable<FormQuery['form']>['questions'][number];

type Props = {
  question: Question;
  index: number;
} & Pick<
  ReturnType<typeof useFormFill>,
  'getTextAnswer' | 'setTextAnswer' | 'isChecked' | 'setCheckboxAnswer'
>;

export function QuestionItem({
  question,
  index,
  getTextAnswer,
  setTextAnswer,
  isChecked,
  setCheckboxAnswer,
}: Props) {
  const validOptions = (question.options ?? []).filter(
    (opt): opt is string => typeof opt === 'string',
  );

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'TEXT':
        return (
          <Input
            className="w-full"
            value={getTextAnswer(question.id)}
            onChange={event => setTextAnswer(question.id, event.target.value)}
            placeholder="Type your answer"
          />
        );

      case 'DATE':
        return (
          <Input
            type="date"
            aria-label={`${question.text} date`}
            value={getTextAnswer(question.id)}
            onChange={event => setTextAnswer(question.id, event.target.value)}
          />
        );

      case 'MULTIPLE_CHOICE':
        return (
          <div className="space-y-2">
            {validOptions.map(option => {
              const inputId = `${question.id}-${option.replace(/\s+/g, '-')}`;
              return (
                <div key={option} className="flex items-center gap-2 text-slate-700">
                  <input
                    type="radio"
                    id={inputId}
                    name={question.id}
                    checked={getTextAnswer(question.id) === option}
                    onChange={() => setTextAnswer(question.id, option)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={inputId} className="cursor-pointer select-none">
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        );

      case 'CHECKBOX':
        return (
          <div className="space-y-2">
            {validOptions.map(option => {
              const inputId = `${question.id}-${option.replace(/\s+/g, '-')}`;
              return (
                <div key={option} className="flex items-center gap-2 text-slate-700">
                  <Input
                    type="checkbox"
                    id={inputId}
                    checked={isChecked(question.id, option)}
                    onChange={event =>
                      setCheckboxAnswer(question.id, option, event.target.checked)
                    }
                  />
                  <label htmlFor={inputId} className="cursor-pointer select-none">
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        );

      default:
        return (
          <p className="mt-2 text-xs text-slate-500">
            Unsupported question type: {question.type}
          </p>
        );
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="mb-2 font-medium text-slate-900">
        {index + 1}. {question.text}
      </p>
      {renderQuestionInput()}
    </div>
  );
}