import { useCreateForm } from '../hooks/useCreateForm';
import { FormMetaSection } from '../components/create-form/FormMetaSection';
import { QuestionsSection } from '../components/create-form/QuestionsSection';
import { CreateFormActions } from '../components/create-form/CreateFormActions';
import { Toast } from '../ui/Toast';

export function CreateFormPage() {
  const {
    draft,
    isLoading,
    errorMessage,
    successMessage,

    setTitle,
    setDescription,

    addQuestion,
    updateQuestion,
    moveQuestion,
    removeQuestion,

    addOption,
    updateOption,
    removeOption,

    reset,
    saveForm,
  } = useCreateForm();

  return (
    <div className="space-y-6">
      <FormMetaSection
        title={draft.title}
        description={draft.description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />

      <QuestionsSection
        questions={draft.questions}
        onAddQuestion={addQuestion}
        onUpdateQuestion={updateQuestion}
        onMoveQuestion={moveQuestion}
        onRemoveQuestion={removeQuestion}
        onAddOption={addOption}
        onUpdateOption={updateOption}
        onRemoveOption={removeOption}
      />

      <CreateFormActions
        isLoading={isLoading}
        onReset={reset}
        onSave={saveForm}
      />

      {errorMessage && <Toast type="error" message={errorMessage} />}
      {successMessage && <Toast type="success" message={successMessage} />}
    </div>
  );
}
