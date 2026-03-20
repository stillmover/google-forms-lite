import type { QuestionModel } from '../../types/question';
import type { QuestionType } from '../../api/generated';
import { Button } from '../../ui';

type Props = {
  question: QuestionModel;
  index: number;

  onUpdateQuestion: (id: string, patch: Partial<QuestionModel>) => void;
  onMoveQuestion: (id: string, direction: 'up' | 'down') => void;
  onRemoveQuestion: (id: string) => void;

  onAddOption: (id: string) => void;
  onUpdateOption: (id: string, index: number, value: string) => void;
  onRemoveOption: (id: string, index: number) => void;
};

export function QuestionItem({
  question,
  index,
  onUpdateQuestion,
  onMoveQuestion,
  onRemoveQuestion,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: Props) {
  return (
    <li className="rounded-lg border border-slate-200 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="grid flex-1 gap-2">
          <label className="grid gap-1">
            <span className="text-sm font-medium text-slate-700">
              Question {index + 1}
            </span>

            <input
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              value={question.text}
              onChange={e =>
                onUpdateQuestion(question.id, { text: e.target.value })
              }
              placeholder="Question text"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium text-slate-700">Type</span>

            <select
              className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
              value={question.type}
              onChange={e =>
                onUpdateQuestion(question.id, {
                  type: e.target.value as QuestionType,
                })
              }
            >
              <option value="TEXT">Text</option>
              <option value="CHECKBOX">Checkbox</option>
              <option value="MULTIPLE_CHOICE">Multiple choice</option>
              <option value="DATE">Date</option>
            </select>
          </label>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => onMoveQuestion(question.id, 'up')}
          >
            Up
          </Button>

          <Button
            variant="ghost"
            onClick={() => onMoveQuestion(question.id, 'down')}
          >
            Down
          </Button>

          <Button
            variant="danger"
            onClick={() => onRemoveQuestion(question.id)}
          >
            Remove
          </Button>
        </div>
      </div>

      {question.type !== 'TEXT' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">Options</p>

            <Button
              variant="ghost"
              className="bg-gray-100 hover:bg-gray-200"
              onClick={() => onAddOption(question.id)}
              type="button"
            >
              + Add Option
            </Button>
          </div>

          {question.options.map((option, optionIndex) => (
            <div key={`${question.id}-${optionIndex}`} className="flex gap-2">
              <input
                className="flex-1 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                value={option}
                onChange={e =>
                  onUpdateOption(question.id, optionIndex, e.target.value)
                }
                placeholder={`Option ${optionIndex + 1}`}
              />

              <Button
                variant="danger"
                onClick={() => onRemoveOption(question.id, optionIndex)}
                type="button"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
