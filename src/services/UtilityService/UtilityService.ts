import { Utility } from '../../classes/Utility/Utility';
import { logError, logInfo } from '../../utils/logger';
import { CLI } from '../../classes/CLI';

export class UtilityService {
  public async getRandomNumbers(): Promise<number[]> {
    const quantityRaw: string = await CLI.inputQuestion(
      'How many random numbers do you want?',
    );
    const qyantityParsed = parseInt(quantityRaw);

    if (isNaN(qyantityParsed)) {
      logError('You must input a number!');
      CLI.exitFromProcess();
    }
    logInfo('Generating numbers...');
    const randomNumbers: number[] = Utility.generateRandomNumbers(
      qyantityParsed,
    );

    return randomNumbers;
  }
}
