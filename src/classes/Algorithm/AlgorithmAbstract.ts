export type PassedAlgorithm = Function;
export type PassedAlgorithmExecutionResult = unknown;
export type PassedAlgorithmArgs = unknown[] | unknown;

export interface AlgorithmState {
  time: number;
}
export interface AlgorithmResult {
  result: PassedAlgorithmExecutionResult;
  state: AlgorithmState;
}

export interface IAlgorithmAbstract {
  run: (args: PassedAlgorithmArgs) => AlgorithmResult;
}

export abstract class AlgorithmAbstract implements IAlgorithmAbstract {
  public run(args: PassedAlgorithmArgs): AlgorithmResult {
    throw Error('method not implemented');
  }
}
