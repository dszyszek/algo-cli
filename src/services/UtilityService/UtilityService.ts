import { Utility } from '../../classes/Utility/Utility';
import { logError, logInfo } from '../../utils/logger';
import { CLI } from '../../classes/CLI';

export class UtilityService {
  public async getRandomNumbers(quantity: number): Promise<number[]> {
    if (isNaN(quantity)) {
      logError('You must input a number!');
      CLI.exitFromProcess();
    }
    logInfo('Generating numbers...');
    const randomNumbers: number[] = Utility.generateRandomNumbers(quantity);

    return randomNumbers;
  }
}
