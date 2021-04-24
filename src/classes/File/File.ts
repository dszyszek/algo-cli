import { logSuccess, logError, logInfo } from '../../utils/logger';
import { CLI } from '../CLI/CLI';
import { checkIfExist, createFile } from '../../utils/fs';
import newAlgorithmFileTemplate from '../../templates/new-algorithm-template';

export class File {
  private fileName: Promise<string> | string = '';
  private filePath: Promise<string> | string;

  constructor(passedFilePath: string, passedFileName?: string) {
    this.filePath = passedFilePath ?? this.getFilePath();

    if (passedFileName) {
      this.fileName = passedFileName;
    }
  }

  private createFileHandler = async (
    filePath: string,
    algorithmTemplate?: string,
  ): Promise<void> => {
    createFile(filePath, algorithmTemplate);
    logSuccess('File generated!');
  };

  private getRawContent = (pathToFile: string): Promise<string> => {
    return import(pathToFile).then((rawFile) => rawFile);
  };

  // TODO: below methods should go to FileService class

  private async getNewFileName(): Promise<string> {
    const file_name = await CLI.fileNameQuestion('Input name of the new file');
    return file_name;
  }

  private async getFilePath(): Promise<string> {
    const file_path = await CLI.filePathQuestion('Input path to the new file');
    return file_path;
  }

  private overrideFileHandler = async (
    filePath: string,
    algorithmTemplate?: string,
  ): Promise<void> => {
    const file_override = await CLI.confirmQuestion(
      'File already exist, want to override?',
    );
    if (file_override) {
      this.createFileHandler(filePath, algorithmTemplate);
      return;
    }

    logInfo('File was not generated');
  };

  public getContent = async (): Promise<string> => {
    const { filePath } = this;
    const fileName = !!this.fileName
      ? this.fileName
      : await this.getNewFileName();
    const fullFilePath = `${filePath}/${fileName}`;

    return this.getRawContent(fullFilePath);
  };

  public create = async (): Promise<void> => {
    const { filePath } = this;
    const newFileName = !!this.fileName
      ? this.fileName
      : await this.getNewFileName();

    const newFilePath = `${filePath}/${newFileName}.ts`;

    const fileExist = checkIfExist(newFilePath);

    if (!fileExist) {
      this.createFileHandler(newFilePath, newAlgorithmFileTemplate);
    } else {
      this.overrideFileHandler(newFilePath, newAlgorithmFileTemplate);
    }
  };
}
