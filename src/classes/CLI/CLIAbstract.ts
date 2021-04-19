export interface ICLIAbstract {
  start(): void;
  createAlgorithm(): void;
  runAlgorithm(): void;
  compareAlgorithm(): void;
  generateRandomNumbers(): void;
}

export abstract class CLIAbstract implements CLIAbstract {
  public start = (): void => {
    throw Error('method not implemented!');
  };
  public createAlgorithm = (): void => {
    throw Error('method not implemented!');
  };
  public runAlgorithm = (): void => {
    throw Error('method not implemented!');
  };
  public compareAlgorithm = (): void => {
    throw Error('method not implemented!');
  };
  public generateRandomNumbers = (): void => {
    throw Error('method not implemented!');
  };
}
