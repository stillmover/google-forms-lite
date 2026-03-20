import { Button } from '../../ui';

type Props = {
  isLoading: boolean;
  onReset: () => void;
  onSave: () => void;
};

export function CreateFormActions({ isLoading, onReset, onSave }: Props) {
  return (
    <div className="flex justify-end gap-3">
      <Button variant="ghost" onClick={onReset}>
        Reset
      </Button>

      <Button variant="primary" disabled={isLoading} onClick={onSave}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  );
}
