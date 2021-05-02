import {
  FileSystem,
  ValidatedFilePath,
} from '../../classes/FileSystem/FileSystem';
import { CLI } from '../../classes/CLI/CLI';
import { logSuccess, logError, logInfo } from '../../utils/logger';
import newAlgorithmFileTemplate from '../../templates/new-algorithm-template';

export interface FileSystemConfig {
  allowedInputFileExtensions: string[];
}

export class FileSystemService {
  private currentFileName: string = '';
  private currentFilePath: string = '';
  private fileSystemConfig: FileSystemConfig = {
    allowedInputFileExtensions: ['js'],
  };

  constructor(
    passedFilePath?: string,
    passedFileName?: string,
    passedConfig?: FileSystemConfig,
  ) {
    if (passedFileName) {
      this.fileName = passedFileName;
    }

    if (passedFilePath) {
      this.filePath = passedFilePath;
    }

    if (passedConfig) {
      this.fileSystemConfig = passedConfig;
    }
  }

  public set fileName(fileName: string) {
    this.currentFileName = fileName;
  }

  public set filePath(passedFilePath: string) {
    const {
      fileName,
      filePath,
    }: ValidatedFilePath = FileSystem.validateFilePath(passedFilePath);
    const pathNormalized = FileSystem.normalizePath(filePath);
    this.currentFilePath = pathNormalized;
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

  private validateExtension(path: string) {
    const { allowedInputFileExtensions } = this.fileSystemConfig;
    const splittedByDot = path.split('.');
    const extension = splittedByDot[splittedByDot.length - 1];
    const passedExtensionAllowed = allowedInputFileExtensions.includes(
      extension,
    );

    if (!passedExtensionAllowed) {
      return false;
    }

    return true;
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
    content: string = '',
  ): Promise<void> => {
    FileSystem.createFile(filePath, content);
    logSuccess(`File generated at ${filePath}!`);
  };

  private overrideFileHandler = async (
    filePath: string,
    content: string = '',
  ): Promise<void> => {
    const file_override = await CLI.confirmQuestion(
      'File already exist, want to override?',
    );
    if (file_override) {
      this.createFileHandler(filePath, content);
      return;
    }

    logInfo('File was not generated');
  };

  private validateFileBeforeImport(
    pathToFile: string,
    fileName: string,
  ): boolean {
    const fileExist = FileSystem.checkIfExist(pathToFile);

    if (!fileExist) {
      logError(`Cannot import - file "${fileName}" doesn't exist`);
      return false;
    }

    const checkIfDirectory = FileSystem.checkIfDirectory(pathToFile);
    if (checkIfDirectory) {
      logError(`Cannot import directory!`);
      return false;
    }

    const validateExtension = this.validateExtension(pathToFile);
    if (!validateExtension) {
      logError(
        `File of that extension is not allowed! (allowed values: ${this.fileSystemConfig.allowedInputFileExtensions})`,
      );
      return false;
    }

    return true;
  }

  public getContent = async (): Promise<string | null> => {
    const filePath = await this.getFilePath();
    const fileName = await this.getFileName();
    const fullFilePath = `${filePath}/${fileName}`;
    const isValid = this.validateFileBeforeImport(fullFilePath, fileName);

    if (isValid) {
      return FileSystem.getRawFile(fullFilePath);
    }

    return null;
  };

  public importFromFile = async (): Promise<Function | null> => {
    const filePath = await this.getFilePath();
    const fileName = await this.getFileName();
    const fullFilePath = `${filePath}/${fileName}`;
    const isValid = this.validateFileBeforeImport(fullFilePath, fileName);

    if (isValid) {
      return FileSystem.importFile(fullFilePath);
    }

    return null;
  };

  public create = async (
    content: string = newAlgorithmFileTemplate,
    extension: string = 'ts',
  ): Promise<string> => {
    const filePath = await this.getFilePath();
    const newFileName = await this.getFileName();
    const newFilePath = `${filePath}/${newFileName}.${extension}`;

    const fileExist = FileSystem.checkIfExist(newFilePath);

    if (!fileExist) {
      this.createFileHandler(newFilePath, content);
    } else {
      this.overrideFileHandler(newFilePath, content);
    }

    return newFilePath;
  };
}
