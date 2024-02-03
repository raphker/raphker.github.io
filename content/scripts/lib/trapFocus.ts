export const trapFocus = (container: HTMLElement) => {
  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>("a, button")
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyFirst = (e: KeyboardEvent) => {
    if (e.shiftKey && e.code === "Tab") {
      e.preventDefault();
      lastElement?.focus();
      console.log(lastElement);
    }
  };

  const handleKeyLast = (e: KeyboardEvent) => {
    if (!e.shiftKey && e.code === "Tab") {
      e.preventDefault();
      firstElement?.focus();
    }
  };
  firstElement?.addEventListener("keydown", handleKeyFirst);
  lastElement?.addEventListener("keydown", handleKeyLast);
  return () => {
    firstElement?.removeEventListener("keydown", handleKeyFirst);
    lastElement?.removeEventListener("keydown", handleKeyLast);
  };
};
