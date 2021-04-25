import fs from 'fs-extra';

export class FileSystem {
  protected importFile = (pathToFile: string): Promise<Function> => {
    return import(pathToFile).then((rawFile) => rawFile.default);
  };

  protected getRawFile(
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

  protected checkIfExist = (path: string): boolean => fs.existsSync(path);

  protected createFile = (path: string, content: string = ''): void =>
    fs.writeFileSync(path, content);

  protected mkdir = (path: string): void => fs.mkdirSync(path);
}
