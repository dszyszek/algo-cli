import { CLI } from '../../classes/CLI';
import { ICLI } from '../../classes/CLI/types';
import { mainOptionsQuestion } from '../../questions/main-options';
import { AlgorithmPossibleActions } from '../../models/algorithm-actions';
import { CompareAlgorithmsMain } from '../../models/algorithm-compare';
import { UtilityActionMain } from '../../models/utility-actions';
import { AlgorithmPayloadAvailableOptions } from '../../models/algorithm-payload-options';
import { FileSystemService } from '../../services/FileSystemService/FileSystemService';
import { algorithmPayloadQuestion } from '../../questions/algorithm-payload-options';
import { AlgorithmService } from '../AlgorithmService/AlgorithmService';
import { parseToIntArray } from '../../utils/number';
import { algorithmComparePayloadQuestion } from '../../questions/compare-algorithms';
import { CompareAlborithmsBy } from '../../models/algorithm-compare';
import { AlgorithmType } from '../../classes/Algorithm/types';
import { logError } from '../../utils/logger';
import { UtilityService } from '../UtilityService/UtilityService';
import { UtilityPossibleActionValues } from '../../models/utility-actions';
import { utilityActionsQuestion } from '../../questions/utility-actions';
import { CommandService } from '../CommandService/CommandService';

export default class CLIService {
  private cliInstance: ICLI;
  private utilityServiceInstance: UtilityService;
  private commandService: CommandService;

  constructor() {
    this.cliInstance = new CLI();
    this.utilityServiceInstance = new UtilityService();
    this.commandService = new CommandService(process.argv);
  }

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
        break;
    }
  }

  private async handleCreateAlgorithm(): Promise<void> {
    const file_name = await CLI.fileNameQuestion(
      'Input name of the new algorithm file',
    );
    const file_path = await CLI.filePathQuestion(
      'Input path to the new algorithm file',
    );

    new FileSystemService(file_path, file_name).create();
  }

  private async handleAlgorithmPayload(
    algorithmOptions: AlgorithmPayloadAvailableOptions,
  ): Promise<number[] | null> {
    let algorithmPayload: number[];
    switch (algorithmOptions) {
      case AlgorithmPayloadAvailableOptions.FROM_FILE:
        const path_to_file = await CLI.filePathQuestion('Input path to file');
        const fileClass = new FileSystemService(path_to_file);
        const rawFileContent = await fileClass.getContent();

        if (!rawFileContent) {
          return null;
        }
        algorithmPayload = parseToIntArray(rawFileContent);
        break;
      case AlgorithmPayloadAvailableOptions.YOURSELF:
        const rawNumbers = await CLI.inputQuestion(
          'Input numbers list (comma separated!)',
        );

        if (!rawNumbers) {
          return null;
        }

        algorithmPayload = parseToIntArray(rawNumbers);
        break;
      case AlgorithmPayloadAvailableOptions.GENERATE_ON_FLY:
        const randomNumbers = await this.utilityServiceInstance.getRandomNumbers();
        algorithmPayload = randomNumbers;
        break;
      default:
        logError('algorithmPayload is empty!');
        algorithmPayload = [];
    }

    return algorithmPayload;
  }

  private async handleRunAlgorithm(): Promise<void> {
    let algorithmPayload: number[];
    let readyAlgorithm: AlgorithmType = {
      algo: new Function(),
      name: '',
    };

    // get algorithm
    const file_path = await CLI.filePathQuestion(
      'Input path to the algorithm file',
    );
    const algorithmFSService: FileSystemService = new FileSystemService(
      file_path,
    );
    const algorithm: Function | null = await algorithmFSService.importFromFile();
    const algorithmName = algorithmFSService.fileName;

    if (!algorithm) {
      return;
    }

    readyAlgorithm.algo = algorithm;
    readyAlgorithm.name = algorithmName;

    // ask for payload (file or input array)
    const { algorithm_payload_options } = await algorithmPayloadQuestion();

    // get algo payload
    const payload = await this.handleAlgorithmPayload(
      algorithm_payload_options,
    );
    if (!payload) {
      return;
    }
    algorithmPayload = payload;
    // run algorithm

    const algorithmService = new AlgorithmService(
      algorithmPayload,
      readyAlgorithm,
    );
    algorithmService.execute();
    algorithmService.display();
  }

  private async handleAlgorithmCompare(): Promise<void> {
    const {
      algorithm_compare_payload,
    } = await algorithmComparePayloadQuestion();

    switch (algorithm_compare_payload) {
      case CompareAlborithmsBy.COMPARE_BY_PERFORMANCE:
        let algorithmPayload: number[];
        const algorithms: AlgorithmType[] = [];

        const { algorithm_payload_options } = await algorithmPayloadQuestion();

        const payload = await this.handleAlgorithmPayload(
          algorithm_payload_options,
        );
        if (!payload) {
          return;
        }
        algorithmPayload = payload;

        const pathsToFilesRaw = await CLI.filePathQuestion(
          'Input paths to algorithm files (comma separated)',
        );
        const pathsToFiles = pathsToFilesRaw.split(',');
        const FSService = new FileSystemService();

        for (let i = 0; i < pathsToFiles.length; i++) {
          FSService.filePath = pathsToFiles[i];
          const algo = await FSService.importFromFile();

          if (!algo) {
            return;
          }

          const name = FSService.fileName;
          algorithms.push({
            algo,
            name,
          });
        }

        const algorithmService: AlgorithmService = new AlgorithmService(
          algorithmPayload,
          ...algorithms,
        );
        algorithmService.execute();
        algorithmService.display();
    }
  }

  private async handleUtilityActions(): Promise<void> {
    const { utility_action } = await utilityActionsQuestion();

    switch (utility_action) {
      case UtilityPossibleActionValues.CREATE_RANDOM_NUMBERS_FILE:
        const randomNumbers: number[] = await this.utilityServiceInstance.getRandomNumbers();
        const randomNumbersStringified: string = randomNumbers.join(',');
        const newFilePath = await CLI.filePathQuestion(
          'Input path to the new file',
        );
        const fileSystemServiceInstance = new FileSystemService(newFilePath);
        fileSystemServiceInstance.create(randomNumbersStringified, 'csv');

        break;
      default:
        logError('Sth went wrong -- handleUtilityActions');
    }
  }

  public start = (): void => {
    const commandOptions = this.commandService.getCommands();
    console.log(commandOptions, 'commandOptions');
    this.cliInstance.displayBanner();
    this.handleMainQuestions();
  };
}
