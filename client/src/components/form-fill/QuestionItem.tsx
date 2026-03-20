import { isChoiceType, useFormFill } from '../../hooks/useFormFill';
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
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="mb-2 font-medium text-slate-900">
        {index + 1}. {question.text}
      </p>

      {question.type === 'TEXT' && (
        <Input
          className="w-full"
          value={getTextAnswer(question.id)}
          onChange={event => setTextAnswer(question.id, event.target.value)}
          placeholder="Type your answer"
        />
      )}

      {question.type === 'DATE' && (
        <Input
          type="date"
          aria-label={`${question.text} date`}
          value={getTextAnswer(question.id)}
          onChange={event => setTextAnswer(question.id, event.target.value)}
        />
      )}

      {question.type === 'MULTIPLE_CHOICE' && (
        <div className="space-y-2">
          {(question.options ?? [])
            .filter((opt): opt is string => typeof opt === 'string')
            .map(option => (
              <label
                key={option}
                className="flex items-center gap-2 text-slate-700"
              >
                <input
                  type="radio"
                  name={question.id}
                  checked={getTextAnswer(question.id) === option}
                  onChange={() => setTextAnswer(question.id, option)}
                />
                <span>{option}</span>
              </label>
            ))}
        </div>
      )}

      {question.type === 'CHECKBOX' && (
        <div className="space-y-2">
          {(question.options ?? [])
            .filter((opt): opt is string => typeof opt === 'string')
            .map(option => (
              <label
                key={option}
                className="flex items-center gap-2 text-slate-700"
              >
                <Input
                  type="checkbox"
                  checked={isChecked(question.id, option)}
                  onChange={event =>
                    setCheckboxAnswer(question.id, option, event.target.checked)
                  }
                />
                <span>{option}</span>
              </label>
            ))}
        </div>
      )}

      {!isChoiceType(question.type) && (
        <p className="mt-2 text-xs text-slate-500">
          Question type: {question.type}
        </p>
      )}
    </div>
  );
}
