import { FileSystem } from '../../classes/FileSystem/FileSystem';
import { CLI } from '../../classes/CLI/CLI';
import { logSuccess, logError, logInfo } from '../../utils/logger';
import newAlgorithmFileTemplate from '../../templates/new-algorithm-template';

interface ValidatedFilePath {
  fileName: string;
  filePath: string;
}

export class FileSystemService extends FileSystem {
  private currentFileName: string = '';
  private currentFilePath: string = '';

  constructor(passedFilePath?: string, passedFileName?: string) {
    super();
    if (passedFileName) {
      this.fileName = passedFileName;
    }

    if (passedFilePath) {
      this.filePath = passedFilePath;
    }
  }

  public set fileName(fileName: string) {
    this.currentFileName = fileName;
  }

  public set filePath(passedFilePath: string) {
    const { fileName, filePath }: ValidatedFilePath = this.validateFilePath(
      passedFilePath,
    );
    this.currentFilePath = filePath;
    if (!!fileName) {
      this.fileName = fileName;
    }
  }

  public get fileName() {
    return this.currentFileName;
  }

  public get filePath() {
    return this.currentFilePath;
  }

  private validateFilePath(passedFilePath: string): ValidatedFilePath {
    let filePath: string;
    let fileName: string = '';
    const filePathSplit = passedFilePath.split('/');
    const lastElementOfFilePath = filePathSplit[filePathSplit.length - 1];
    const indexOfDot = lastElementOfFilePath.indexOf('.');
    if (indexOfDot > -1) {
      fileName = filePathSplit[filePathSplit.length - 1];
    }
    filePath = filePathSplit.slice(0, filePathSplit.length - 1).join('/');

    return {
      fileName,
      filePath,
    };
  }

  private async getFileName(): Promise<string> {
    let fileName: string;
    if (!!this.fileName) {
      fileName = this.fileName;
    } else {
      fileName = await CLI.fileNameQuestion('Input name of the file');
      this.fileName = fileName;
    }

    return fileName;
  }

  private async getFilePath(): Promise<string> {
    let file_path: string;
    if (!!this.filePath) {
      file_path = this.filePath;
    } else {
      file_path = await CLI.filePathQuestion('Input path to the file');
      this.filePath = file_path;
    }

    return file_path;
  }

  private createFileHandler = async (
    filePath: string,
    algorithmTemplate?: string,
  ): Promise<void> => {
    this.createFile(filePath, algorithmTemplate);
    logSuccess('File generated!');
  };

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

  private validateFileBeforeImport(pathToFile: string): boolean {
    const fileExist = this.checkIfExist(pathToFile);
    if (!fileExist) {
      logError("Cannot import - file doesn't exist");
      return false;
    }

    return true;
  }

  public getContent = async (): Promise<string | null> => {
    const filePath = await this.getFilePath();
    const fileName = await this.getFileName();
    const fullFilePath = `${filePath}/${fileName}`;
    const isValid = this.validateFileBeforeImport(fullFilePath);

    if (isValid) {
      return this.getRawFile(fullFilePath);
    }

    return null;
  };

  public importFromFile = async (): Promise<Function | null> => {
    const filePath = await this.getFilePath();
    const fileName = await this.getFileName();
    const fullFilePath = `${filePath}/${fileName}`;
    const isValid = this.validateFileBeforeImport(fullFilePath);

    if (isValid) {
      return this.importFile(fullFilePath);
    }

    return null;
  };

  public create = async (): Promise<void> => {
    const filePath = await this.getFilePath();
    const newFileName = await this.getFileName();
    const newFilePath = `${filePath}/${newFileName}.ts`;

    const fileExist = this.checkIfExist(newFilePath);

    if (!fileExist) {
      this.createFileHandler(newFilePath, newAlgorithmFileTemplate);
    } else {
      this.overrideFileHandler(newFilePath, newAlgorithmFileTemplate);
    }
  };
}
