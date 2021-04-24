import { red, green, cyan, magenta } from 'kleur';

export const logError = (message: string): void => {
  const redMessage = red(message);
  console.error(redMessage);
};

export const logSuccess = (message: string): void => {
  const greenMessage = green(message);
  console.error(greenMessage);
};

export const logInfo = (message: string): void => {
  const cyanMessage = cyan(message);
  console.error(cyanMessage);
};

export const logBreak = (): void => {
  console.log('\n========================================\n');
};
