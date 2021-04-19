import { CLI } from '../../classes/CLI';
import { displayBanner } from '../../utils/logger';

export default class CLIService extends CLI {
  public start = (): void => {
    displayBanner();
    this.handleMainQuestions();
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
