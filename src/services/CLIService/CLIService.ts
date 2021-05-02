import { CLI } from '../../classes/CLI';
import { ICLI } from '../../classes/CLI/types';
import { AlgorithmPossibleActions } from '../../models/algorithm-actions';
import { CompareAlgorithmsMain } from '../../models/algorithm-compare';
import { UtilityActionMain } from '../../models/utility-actions';
import { AlgorithmPayloadAvailableOptions } from '../../models/algorithm-payload-options';
import {
  FileSystemService,
  FileSystemConfig,
} from '../../services/FileSystemService/FileSystemService';
import { AlgorithmService } from '../AlgorithmService/AlgorithmService';
import { parseToIntArray } from '../../utils/number';
import { CompareAlborithmsBy } from '../../models/algorithm-compare';
import { AlgorithmType } from '../../classes/Algorithm/types';
import { logError } from '../../utils/logger';
import { UtilityService } from '../UtilityService/UtilityService';
import { UtilityPossibleActionValues } from '../../models/utility-actions';
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
    const selectedMode: string = await this.commandService.getMainMode();

    switch (selectedMode) {
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
    const file_name = await this.commandService.getFileName(
      'Input name of the new algorithm file',
    );
    const file_path = await this.commandService.getOutputPath(
      'Input path to the new algorithm file',
    );

    new FileSystemService(file_path, file_name).create();
  }

  private async handleAlgorithmPayload(
    algorithmOptions: AlgorithmPayloadAvailableOptions,
    fileSystemServiceConfig: FileSystemConfig | undefined = undefined,
  ): Promise<number[] | null> {
    let algorithmPayload: number[];
    switch (algorithmOptions) {
      case AlgorithmPayloadAvailableOptions.FROM_FILE:
        const path_to_file = await this.commandService.getFilePayload(
          'Input path to file',
        );
        const fileClass = new FileSystemService(
          path_to_file,
          undefined,
          fileSystemServiceConfig,
        );
        const rawFileContent = await fileClass.getContent();

        if (!rawFileContent) {
          return null;
        }
        algorithmPayload = parseToIntArray(rawFileContent);
        break;
      case AlgorithmPayloadAvailableOptions.YOURSELF:
        algorithmPayload = await this.commandService.getNumbersPayload(
          'Input numbers list (comma separated!)',
        );
        break;
      case AlgorithmPayloadAvailableOptions.GENERATE_ON_FLY:
        const quantity: number = await this.commandService.getQuantity(
          'How many random numbers do you want?',
        );
        const randomNumbers = await this.utilityServiceInstance.getRandomNumbers(
          quantity,
        );
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
    const fileSystemConfig: FileSystemConfig = {
      allowedInputFileExtensions: ['csv', 'js'],
    };

    // get algorithm
    const file_path = await this.commandService.getInputPath(
      'Input path to the algorithm file',
    );
    const algorithmFSService: FileSystemService = new FileSystemService(
      file_path,
      undefined,
      fileSystemConfig,
    );
    const algorithm: Function | null = await algorithmFSService.importFromFile();
    const algorithmName = algorithmFSService.fileName;

    if (!algorithm) {
      return;
    }

    readyAlgorithm.algo = algorithm;
    readyAlgorithm.name = algorithmName;

    // ask for payload (file or input array)
    const algorithm_payload_options = await this.commandService.getSource();

    // get algo payload
    const payload = await this.handleAlgorithmPayload(
      algorithm_payload_options,
      fileSystemConfig,
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
    const algorithm_compare_payload = await this.commandService.getCompareAlgorithmBy();
    const fileSystemConfig: FileSystemConfig = {
      allowedInputFileExtensions: ['csv', 'js'],
    };

    switch (algorithm_compare_payload) {
      case CompareAlborithmsBy.COMPARE_BY_PERFORMANCE:
        let algorithmPayload: number[];
        const algorithms: AlgorithmType[] = [];

        const algorithm_payload_options = await this.commandService.getSource();

        const payload = await this.handleAlgorithmPayload(
          algorithm_payload_options,
          fileSystemConfig,
        );
        if (!payload) {
          return;
        }
        algorithmPayload = payload;

        const pathsToFilesRaw = await this.commandService.getInputPath(
          'Input paths to algorithm files (comma separated)',
        );
        const pathsToFiles = pathsToFilesRaw.split(',');

        if (pathsToFiles.length !== 2) {
          logError('You need to put exactly 2 algorithms paths to compare!');
          CLI.exitFromProcess();
        }

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
    const utility_action = await this.commandService.getUtilityAction();

    switch (utility_action) {
      case UtilityPossibleActionValues.CREATE_RANDOM_NUMBERS_FILE:
        const quantity: number = await this.commandService.getQuantity(
          'How many random numbers do you want?',
        );
        const randomNumbers: number[] = await this.utilityServiceInstance.getRandomNumbers(
          quantity,
        );
        const randomNumbersStringified: string = randomNumbers.join(',');
        const newFilePath = await this.commandService.getOutputPath(
          'Input path to the new file',
        );
        const newFileName = await this.commandService.getFileName(
          'Input name of the new file',
        );
        const fileSystemServiceInstance = new FileSystemService(
          newFilePath,
          newFileName,
        );
        fileSystemServiceInstance.create(randomNumbersStringified, 'csv');

        break;
      default:
        logError('Sth went wrong -- handleUtilityActions');
    }
  }

  public start = (): void => {
    this.commandService.getCommands();
    this.cliInstance.displayBanner();
    this.handleMainQuestions();
  };
}
