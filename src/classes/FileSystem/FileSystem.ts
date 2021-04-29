import fs from 'fs-extra';
import { logError } from '../../utils/logger';

export interface ValidatedFilePath {
  fileName: string;
  filePath: string;
}

export class FileSystem {
  public static importFile = (pathToFile: string): Promise<Function> => {
    return import(pathToFile).then((rawFile) => rawFile.default);
  };

  public static getRawFile(
    pathToFile: string,
    encoding: string = 'utf8',
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToFile, encoding, (error, data) => {
        if (error) {
          console.error(error.message);
          reject();
        }

        resolve(data);
      });
    });
  }

  public static checkIfExist = (path: string): boolean => fs.existsSync(path);

  public static checkIfDirectory = (path: string): boolean | null => {
    try {
      const isDirectory: boolean = fs.lstatSync(path).isDirectory();
      return isDirectory;
    } catch (e) {
      if (e.code === 'ENOENT') {
        logError('No such file/directory!');
      } else {
        throw Error(e);
      }
      return null;
    }
  };

  public static createFile = (path: string, content: string = ''): void =>
    fs.writeFileSync(path, content);

  public static mkdir = (path: string): void => fs.mkdirSync(path);

  public static validateFilePath(passedFilePath: string): ValidatedFilePath {
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

  public static isPathRelative(path: string): boolean {
    return path[0] === '.';
  }

  public static normalizePath(path: string): string {
    const isRelative = FileSystem.isPathRelative(path);
    if (isRelative) {
      return `${process.cwd()}/${path}`;
    }

    return path;
  }
}
