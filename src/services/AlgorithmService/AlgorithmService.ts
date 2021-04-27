import { Algorithm } from '../../classes/Algorithm';
import {
  AlgorithmResult,
  AlgorithmType,
  AllAlgorithmsResult,
} from '../../classes/Algorithm/types';
import { logBreak, logSuccess, logError } from '../../utils/logger';
import isEqual from 'lodash/isEqual';

export class AlgorithmService {
  private payload: unknown[];
  private results: AllAlgorithmsResult[] | null = null;
  private algorithms: AlgorithmType[] = [];

  constructor(algorithmPayload: unknown[], ...args: AlgorithmType[]) {
    this.payload = algorithmPayload;
    this.algorithms = args;
  }

  private validatePath(path: string) {}

  private displayResultHead(): void {
    logBreak();
    console.log('Result');
    logBreak();
  }
  private displayResultBody(singleResult: AllAlgorithmsResult): void {
    logBreak();
    console.log(`Algorithm name: ${singleResult.name}`);
    logSuccess(`Time: ${singleResult.result.state.time}ms`);
  }
  private displayResultFooter(singleResult: AllAlgorithmsResult): void {
    logBreak();
    // TODO: ask if user wants to see the result
    logSuccess('Algorithm output: ' + singleResult.result.result);
    logBreak();
  }

  private checkIfResultsAreTheSame(results: AllAlgorithmsResult[]): boolean {
    if (!results) {
      return false;
    }
    const first = results[0].result.result;

    return results.every((result) => isEqual(result.result.result, first));
  }

  public display(): void {
    if (!this.results) {
      logError('You have to execute algorithms first!');
      return;
    }
    this.displayResultHead();
    this.results.forEach((singleResult: AllAlgorithmsResult) => {
      this.displayResultBody(singleResult);
    });
    this.displayResultFooter(this.results[0]);
  }

  public execute(): void {
    const algorithmsResults: AllAlgorithmsResult[] = this.algorithms.map(
      (algo: AlgorithmType) => {
        const algorithmInstance = new Algorithm(algo.algo);
        const resultOfSingleRun = algorithmInstance.run(this.payload);

        return {
          ...algo,
          result: resultOfSingleRun,
        };
      },
    );

    const resultsAreTheSame: boolean = this.checkIfResultsAreTheSame(
      algorithmsResults,
    );

    if (!resultsAreTheSame) {
      logError(
        'Outpus of algorithms are not the same - you need to check the implementations!',
      );
      return;
    }

    this.results = algorithmsResults;
  }

  public compare(): void {
    if (!this.results) {
      logError('You have to execute algorithms first!');
      return;
    }

    throw Error('Not implemented yet!');
  }
}
