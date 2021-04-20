import { CLI } from '../../classes/CLI';
import { displayBanner } from '../../utils/logger';

export default class CLIService extends CLI {
  public start = (): void => {
    displayBanner();
    this.handleMainQuestions();
  };
}
