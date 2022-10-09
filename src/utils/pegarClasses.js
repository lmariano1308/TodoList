export const pegarClasses = (classes) =>
  classes
    .filter((item) => item !== '')
    .join(' ')
    .trim();
