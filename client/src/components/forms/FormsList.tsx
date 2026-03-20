import type { FormsQuery } from '../../api/generated';
import { FormListItem } from './FormListItem';

type Props = {
  forms: FormsQuery['forms'];
};

export function FormsList({ forms }: Props) {
  return (
    <ul className="space-y-3">
      {forms.map(form => (
        <FormListItem key={form.id} form={form} />
      ))}
    </ul>
  );
}
