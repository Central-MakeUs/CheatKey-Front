import { useState, useEffect } from "react";

/**
 * 값의 변경을 지연시키는 Debounce 훅
 * @param value 지연시킬 값
 * @param delay 지연 시간 (ms)
 * @returns 지연 처리된 값
 */

export const useDebounce = <T>(value: T, delay: number): T => {
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
};
