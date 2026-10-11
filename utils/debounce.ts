export type Debounced<A extends unknown[]> = ((...args: A) => void) & {
  cancel: () => void;
  flush: () => void;
};

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delay = 400,
): Debounced<A> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: A | undefined;

  const debounced = (...args: A) => {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, delay);
  };

  // drop the pending call
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
  };

  // run the pending call right now (e.g. on submit or blur)
  debounced.flush = () => {
    if (timer && lastArgs) {
      clearTimeout(timer);
      timer = undefined;
      fn(...lastArgs);
    }
  };

  return debounced;
}
