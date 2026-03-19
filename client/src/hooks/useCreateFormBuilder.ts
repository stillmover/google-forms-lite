import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateFormMutation } from '../api/enhancedApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { resetCreateDraft } from '../store/formsSlice'
import {
  toCreateFormPayload,
  validateCreateFormDraft,
} from '../services/formBuilder.service'

export const useCreateFormBuilder = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const draft = useAppSelector((state) => state.forms.createDraft)
  const [createForm, { isLoading }] = useCreateFormMutation()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const saveForm = async () => {
    setErrorMessage(null)

    const validationError = validateCreateFormDraft(draft)
    if (validationError) {
      setErrorMessage(validationError)
      return false
    }

    try {
      await createForm(toCreateFormPayload(draft)).unwrap()
      dispatch(resetCreateDraft())
      navigate('/')
      return true
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save form.')
      return false
    }
  }

  return {
    draft,
    isLoading,
    errorMessage,
    saveForm,
  }
}
