import { useEffect, useMemo, useRef } from "react";
import { debounce, Debounced } from "./debounce";

export function useDebounceCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  delay = 400,
): Debounced<A> {
  // always call the latest callback without recreating the timer
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  const debounced = useMemo(
    () => debounce((...args: A) => callbackRef.current(...args), delay),
    [delay],
  );

  // clear any pending call when the component unmounts
  useEffect(() => () => debounced.cancel(), [debounced]);

  return debounced;
}
