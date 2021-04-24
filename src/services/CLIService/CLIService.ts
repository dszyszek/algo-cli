import { CLI } from '../../classes/CLI';
import { mainOptionsQuestion } from '../../questions/main-options';
import { AlgorithmPossibleActions } from '../../models/algorithm-actions';
import { CompareAlgorithmsMain } from '../../models/algorithm-compare';
import { UtilityActionMain } from '../../models/utility-actions';
import { File } from '../../classes/File/File';

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
      case CompareAlgorithmsMain.COMPARE_ALGORITHMS:
        this.handleAlgorithmCompare();
        break;
      case UtilityActionMain.UTILITY_ACTIONS:
        this.handleUtilityActions();
    }
  }

  private async handleCreateAlgorithm(): Promise<void> {
    const file_name = await CLI.fileNameQuestion(
      'Input name of the new algorithm file',
    );
    const file_path = await CLI.filePathQuestion(
      'Input path to the new algorithm file',
    );

    new File(file_name, file_path);
  }

  private async handleRunAlgorithm(): Promise<void> {
    // get algo file name
    const file_path = await CLI.filePathQuestion(
      'Input path to the algorithm file',
    );
    // ask for payload (file or input array)
    // run AlgorithmService.execute

    console.log('Handle run algorithm');
  }

  private handleAlgorithmCompare(): void {
    console.log('Handle algorithm compare');
  }

  private handleUtilityActions(): void {
    console.log('Handle utility actions');
  }

  public start = (): void => {
    this.displayBanner();
    this.handleMainQuestions();
  };
}
