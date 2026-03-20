import { useEffect } from 'react';
import { useFormsQuery } from '../api/enhancedApi';
import { useAppDispatch } from '../store/hooks';
import { setForms } from '../store/formsSlice';

export function useHomePage() {
  const dispatch = useAppDispatch();

  const query = useFormsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (query.data?.forms) {
      dispatch(setForms(query.data.forms));
    }
  }, [query.data, dispatch]);

  return {
    forms: query.data?.forms ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}