import { CLIAbstract } from './CLIAbstract';
import { displayBanner } from '../../utils/logger';
import { mainOptionsQuestion } from '../../questions/main-options';

export class CLI extends CLIAbstract {
  public start = (): void => {
    displayBanner();
    mainOptionsQuestion();
  };
  public createAlgorithm = (): void => {
    throw Error('method not implemented!');
  };
  public runAlgorithm = (): void => {
    throw Error('method not implemented!');
  };
  public compareAlgorithm = (): void => {
    throw Error('method not implemented!');
  };
  public generateRandomNumbers = (): void => {
    throw Error('method not implemented!');
  };
}
