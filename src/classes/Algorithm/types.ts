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

export interface AlgorithmType {
  algo: Function;
  name: string;
}

export interface AllAlgorithmsResult extends AlgorithmType {
  result: AlgorithmResult;
}
