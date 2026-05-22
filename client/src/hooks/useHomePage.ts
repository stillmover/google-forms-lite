import { useFormsQuery } from '../api/enhancedApi';

export function useHomePage() {
  const query = useFormsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return {
    forms: query.data?.forms ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}