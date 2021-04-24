import { CLIAbstract } from './CLIAbstract';
import { inquirerQuestion } from '../../questions/utility';
import figlet from 'figlet';
import { ConsoleMessage } from '../../models/console-message';
import { magenta } from 'kleur';

export class CLI extends CLIAbstract {
  private figletify(text: string): string {
    return figlet.textSync(text, { horizontalLayout: 'full' });
  }

  protected displayBanner = (): void => {
    const transformedText = this.figletify(ConsoleMessage.TITLE);
    const magentaTitle = magenta(transformedText);
    const magentaBanner = magenta(ConsoleMessage.BANNER);

    console.log(magentaTitle);
    console.log(magentaBanner);
  };

  public static async fileNameQuestion(
    passedMessage?: string,
  ): Promise<string> {
    const randomName: string = 'algo-' + Math.floor(Math.random() * 10000);
    const defaultMessage = 'Enter file name';
    let message = passedMessage ?? defaultMessage;

    const { answer } = await inquirerQuestion<string>(
      'input',
      message,
      randomName,
    );
    return answer;
  }

  public static async filePathQuestion(
    passedMessage?: string,
  ): Promise<string> {
    const defaultFilePath = './';
    const defaultMessage = 'Enter file path';
    let message = passedMessage ?? defaultMessage;

    const { answer } = await inquirerQuestion<string>(
      'input',
      message,
      defaultFilePath,
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
}
