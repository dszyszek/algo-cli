import { CLI } from '../../classes/CLI';
import { mainOptionsQuestion } from '../../questions/main-options';
import { AlgorithmPossibleActions } from '../../models/algorithm-actions';
import { CompareAlgorithmsMain } from '../../models/algorithm-compare';
import { UtilityActionMain } from '../../models/utility-actions';
import { AlgorithmPayloadAvailableOptions } from '../../models/algorithm-payload-options';
import { File } from '../../classes/File/File';
import { algorithmPayloadQuestion } from '../../questions/algorithm-payload-options';
import { AlgorithmService } from '../AlgorithmService/AlgorithmService';
import { parseToIntArray } from '../../utils/number';

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

    new File(file_path, file_name).create();
  }

  private async handleRunAlgorithm(): Promise<void> {
    let algorithmPayload: number[];
    // get algo file name
    const file_path = await CLI.filePathQuestion(
      'Input path to the algorithm file',
    );
    // ask for payload (file or input array)
    const { algorithm_payload_options } = await algorithmPayloadQuestion();

    switch (algorithm_payload_options) {
      case AlgorithmPayloadAvailableOptions.FROM_FILE:
        const path_to_file = await CLI.filePathQuestion('Input path to file');
        const fileClass = new File(path_to_file);
        const rawFileContent = await fileClass.getContent();
        algorithmPayload = parseToIntArray(rawFileContent);
        break;
      case AlgorithmPayloadAvailableOptions.YOURSELF:
        const rawNumbers = await CLI.inputQuestion(
          'Input numbers list (comma separated!)',
        );
        algorithmPayload = parseToIntArray(rawNumbers);
        break;
    }

    // run AlgorithmService.execute

    // const algorithmService = new AlgorithmService();
    // algorithmService.execute();

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
