import { useCallback, useRef } from "react";

const throttle = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
): ((...args: Args) => void) => {
  let lastCall = 0;
  return (...args: Args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

export const useThrottle = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
) => {
  const throttledFn = useRef(throttle(fn, delay)).current;

  return useCallback(throttledFn, [throttledFn]);
};
