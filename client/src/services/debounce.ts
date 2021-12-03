export const debounce = (
  f: React.Dispatch<React.SetStateAction<string>>,
  delay: number
): ((...args: string[]) => void) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};
