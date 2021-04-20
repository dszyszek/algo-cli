import { logSuccess, logError, logInfo } from '../../utils/logger';
import {
  fileNameQuestion,
  filePathQuestion,
  fileOverrideQuestion,
} from '../../questions/utility';
import { checkIfExist, createFile } from '../../utils/fs';
import newAlgorithmFileTemplate from '../../templates/new-algorithm-template';

export class File {
  private fileName: Promise<string> | string;
  private filePath: Promise<string> | string;

  constructor(passedFileName?: string, passedFilePath?: string) {
    this.fileName = passedFileName ?? this.getNewFileName();
    this.filePath = passedFilePath ?? this.getFilePath();
    this.init();
  }

  private async getNewFileName(): Promise<string> {
    const { file_name } = await fileNameQuestion('Input name of the new file');
    return file_name;
  }

  private async getFilePath(): Promise<string> {
    const { file_path } = await filePathQuestion('Input path to the new file');
    return file_path;
  }

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

  private init = async (): Promise<void> => {
    const { fileName, filePath } = this;
    const newFilePath = `${filePath}/${fileName}.ts`;

    const fileExist = checkIfExist(newFilePath);

    if (!fileExist) {
      this.createFileHandler(newFilePath, newAlgorithmFileTemplate);
    } else {
      this.overrideFileHandler(newFilePath, newAlgorithmFileTemplate);
    }
  };
}
