export const trapFocus = (container: HTMLElement) => {
  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>("a, button")
  );
  const handleBlur = (e: FocusEvent) => {
    const currentIndex = focusableElements.findIndex((el) => el === e.target);
    const nextIndex = focusableElements.findIndex(
      (el) => el === e.relatedTarget
    );
    if (nextIndex > 0) return;
    if (currentIndex === 0)
      focusableElements[focusableElements.length - 1]?.focus();
    else focusableElements[0]?.focus();
  };
  focusableElements.forEach((el) => {
    el.addEventListener("blur", handleBlur);
  });
  return () =>
    focusableElements.forEach((el) => {
      el.removeEventListener("blur", handleBlur);
    });
};
