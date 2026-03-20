import { Field, Input, Textarea } from '../../ui';
type Props = {
  title: string;
  description: string;
  onTitleChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
};

export function FormMetaSection({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        Create New Form
      </h2>

      <div className="grid gap-4">
        <Field label="Form Title">
          <Input
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            placeholder="e.g. Employee Feedback Survey"
          />
        </Field>

        <Field label="Description">
          <Textarea
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
          />
        </Field>
      </div>
    </section>
  );
}
