import { CLI } from '../../classes/CLI';
import { displayBanner } from '../../utils/logger';
import { mainOptionsQuestion } from '../../questions/main-options';
import { AlgorithmPossibleActions } from '../../models/algorithm-actions';

export default class CLIService extends CLI {
  private async handleMainQuestions(): Promise<void> {
    const { main_options } = await mainOptionsQuestion();

    switch (main_options) {
      case AlgorithmPossibleActions.CREATE_ALGORITHM:
        this.handleCreateAlgorithm();
        break;
      case AlgorithmPossibleActions.RUN_ALGORITHM:
        this.handleRunAlgorithm();
        break;
    }
  }

  public start = (): void => {
    displayBanner();
    this.handleMainQuestions();
  };
}
