import { ICLI } from './types';
import { inquirerQuestion } from '../../questions/utility';
import figlet from 'figlet';
import { ConsoleMessage } from '../../models/console-message';
import { magenta } from 'kleur';

export class CLI implements ICLI {
  private figletify(text: string): string {
    return figlet.textSync(text, { horizontalLayout: 'full' });
  }

  public static exitFromProcess(exitCode: number = 0) {
    process.exit(exitCode);
  }

  public displayBanner = (): void => {
    const transformedText = this.figletify(ConsoleMessage.TITLE);
    const magentaTitle = magenta(transformedText);
    const magentaBanner = magenta(ConsoleMessage.BANNER);

    console.log(magentaTitle);
    console.log(magentaBanner);
  };

  public static async inputQuestion(
    passedMessage: string,
    passedDefault?: string,
  ): Promise<string> {
    const defaultAnswer = passedDefault ?? '';
    const { answer } = await inquirerQuestion<string>(
      'input',
      passedMessage,
      defaultAnswer,
    );
    return answer;
  }

  public static async confirmQuestion(passedMessage: string): Promise<boolean> {
    const defaultAnswer = false;

    const { answer } = await inquirerQuestion<boolean>(
      'confirm',
      passedMessage,
      defaultAnswer,
    );
    return answer;
  }

  public static async fileNameQuestion(
    passedMessage?: string,
  ): Promise<string> {
    const randomName: string = 'algo-' + Math.floor(Math.random() * 10000);
    const defaultMessage = 'Enter file name';
    let message = passedMessage ?? defaultMessage;

    const fileNameAnswer = await CLI.inputQuestion(message, randomName);
    return fileNameAnswer;
  }

  public static async filePathQuestion(
    passedMessage?: string,
  ): Promise<string> {
    const defaultFilePath = './';
    const defaultMessage = 'Enter file path';
    let message = passedMessage ?? defaultMessage;

    const pathAnswer = await CLI.inputQuestion(message, defaultFilePath);
    return pathAnswer;
  }
}
