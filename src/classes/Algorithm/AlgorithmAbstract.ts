export interface IAlgorithmAbstract {
  create(): void;
}

export abstract class AlgorithmAbstract implements IAlgorithmAbstract {
  public create(): void {
    throw Error('method not implemented');
  }
}
