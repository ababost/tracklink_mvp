import { useState, useCallback } from 'react';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useApi<T>(apiFunc: (...args: any[]) => Promise<T>, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (...args: any[]) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunc(...args);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err as Error);
      options.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunc, options]);

  return {
    data,
    error,
    loading,
    execute
  };
}