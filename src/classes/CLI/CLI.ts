import { CLIAbstract } from './CLIAbstract';
import { logSuccess, logError, logInfo } from '../../utils/logger';
import { mainOptionsQuestion } from '../../questions/main-options';
import { AlgorithmPossibleActions } from '../../models/algorithm-actions';
import {
  fileNameQuestion,
  filePathQuestion,
  fileOverrideQuestion,
} from '../../questions/utility';
import { checkIfExist, createFile } from '../../utils/fs';
import newAlgorithmFileTemplate from '../../templates/new-algorithm-template';

export class CLI extends CLIAbstract {
  private overrideFileHandler = async (
    filePath: string,
    algorithmTemplate?: string,
  ): Promise<void> => {
    const { file_override } = await fileOverrideQuestion();
    if (file_override) {
      this.createFileHandler(filePath, algorithmTemplate);
      return;
    }

    logInfo('File was not generated');
  };

  private createFileHandler = async (
    filePath: string,
    algorithmTemplate?: string,
  ): Promise<void> => {
    createFile(filePath, algorithmTemplate);
    logSuccess('File generated!');
  };

  private async handleCreateAlgorithm(): Promise<void> {
    const { file_name } = await fileNameQuestion(
      'Input name of new algorithm file',
    );
    const { file_path } = await filePathQuestion(
      'Input path to new algorithm file',
    );
    const newFilePath = `${file_path}/${file_name}.ts`;

    const fileExist = checkIfExist(newFilePath);

    if (!fileExist) {
      this.createFileHandler(newFilePath, newAlgorithmFileTemplate);
    } else {
      this.overrideFileHandler(newFilePath, newAlgorithmFileTemplate);
    }
  }

  protected handleMainQuestions = async () => {
    const { main_options } = await mainOptionsQuestion();

    switch (main_options) {
      case AlgorithmPossibleActions.CREATE_ALGORITHM:
        this.handleCreateAlgorithm();
        break;
    }
  };
}
