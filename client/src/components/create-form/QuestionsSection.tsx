import { QuestionItem } from './QuestionItem';
import type { QuestionType } from '../../api/generated';
import { QUESTION_TYPE_OPTIONS } from '../../utils/questionType';
import type { DraftQuestion } from '../../store/formsSlice';
import { Button } from '../../ui';

type Props = {
  questions: DraftQuestion[];

  onAddQuestion: (type: QuestionType) => void;
  onUpdateQuestion: (id: string, patch: Partial<DraftQuestion>) => void;
  onMoveQuestion: (id: string, direction: 'up' | 'down') => void;
  onRemoveQuestion: (id: string) => void;

  onAddOption: (id: string) => void;
  onUpdateOption: (id: string, index: number, value: string) => void;
  onRemoveOption: (id: string, index: number) => void;
};

export function QuestionsSection({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onMoveQuestion,
  onRemoveQuestion,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Questions</h3>

        <div className="flex gap-2">
          {QUESTION_TYPE_OPTIONS.map(t => (
            <Button
              variant="secondary"
              key={t.value}
              onClick={() => onAddQuestion(t.value)}
            >
              + {t.label}
            </Button>
          ))}
        </div>
      </div>

      {questions.length === 0 ? (
        <p>No questions</p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q, i) => (
            <QuestionItem
              key={q.id}
              question={q}
              index={i}
              onUpdateQuestion={onUpdateQuestion}
              onMoveQuestion={onMoveQuestion}
              onRemoveQuestion={onRemoveQuestion}
              onAddOption={onAddOption}
              onUpdateOption={onUpdateOption}
              onRemoveOption={onRemoveOption}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
