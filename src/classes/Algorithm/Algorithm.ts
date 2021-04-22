import {
  PassedAlgorithm,
  PassedAlgorithmExecutionResult,
  PassedAlgorithmArgs,
  AlgorithmState,
  AlgorithmResult,
} from './types';
import { AlgorithmAbstract } from './AlgorithmAbstract';

export class Algorithm extends AlgorithmAbstract {
  private initialState: AlgorithmState = {
    time: 0,
  };
  private state: AlgorithmState;
  private passedAlgorithm: PassedAlgorithm;

  constructor(passedAlgorithm: PassedAlgorithm, state?: AlgorithmState) {
    super();
    if (!passedAlgorithm) {
      throw Error('You have to pass Algorithm!');
    }

    this.passedAlgorithm = passedAlgorithm;
    this.state = state ?? this.initialState;
  }

  private get timeStamp(): number {
    // return current timestamp in miliseconds (from linux epoch)
    return new Date().getTime();
  }

  private setState(state: AlgorithmState): void {
    this.state = state;
  }

  public run(args: PassedAlgorithmArgs): AlgorithmResult {
    const runStart = this.timeStamp;
    const result: PassedAlgorithmExecutionResult = this.passedAlgorithm(args);
    const runEnd = this.timeStamp;
    const executionTime = runEnd - runStart;

    const newState = {
      time: executionTime,
    };
    this.setState(newState);

    return {
      result,
      state: newState,
    };
  }
}
