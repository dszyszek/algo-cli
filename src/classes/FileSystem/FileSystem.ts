import fs from 'fs-extra';

export class FileSystem {
  public getRawContent = (pathToFile: string): Promise<string> => {
    return import(pathToFile).then((rawFile) => rawFile);
  };

  public checkIfExist = (path: string): boolean => fs.existsSync(path);

  public createFile = (path: string, content: string = ''): void =>
    fs.writeFileSync(path, content);

  public mkdir = (path: string): void => fs.mkdirSync(path);
}
