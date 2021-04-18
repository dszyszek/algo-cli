import { red, green, cyan, magenta } from 'kleur';
import figlet from 'figlet';
import { ConsoleMessage } from '../models/console-message';

const figletify = (text: string): string =>
  figlet.textSync(text, { horizontalLayout: 'full' });

export const displayBanner = (): void => {
  const transformedText = figletify(ConsoleMessage.TITLE);
  const magentaTitle = cyan(transformedText);
  const magentaBanner = cyan(ConsoleMessage.BANNER);

  console.log(magentaTitle);
  console.log(magentaBanner);
};

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
