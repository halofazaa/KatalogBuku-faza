import { useState, useEffect } from 'react';

/**
 * Custom hook untuk menunda pembaruan nilai (debouncing)
 * berguna untuk input pencarian agar tidak memicu fetch berulang saat mengetik.
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
