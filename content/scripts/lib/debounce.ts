export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    const later = function () {
      timeoutId = null;
      func.apply(context, args);
    };

    clearTimeout(timeoutId!);
    timeoutId = setTimeout(later, delay);
  };
};
