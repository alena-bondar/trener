export const debounce = (f: any, delay: number) => {
  let timerId: any;

  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};
