import { Algorithm } from '../../classes/Algorithm';
import { AlgorithmResult } from '../../classes/Algorithm/types';
import { logBreak, logSuccess, logError } from '../../utils/logger';

export class AlgorithmService extends Algorithm {
  private payload: unknown[];
  private result: AlgorithmResult | null = null;

  constructor(algorithm: Function, algorithmPayload: unknown[]) {
    super(algorithm);
    this.payload = algorithmPayload;
  }

  private validatePath(path: string) {}

  private displayResult(): void {
    logBreak();
    console.log('Result');
    logBreak();
    logSuccess('Time: ' + this.result?.state.time);
    logSuccess('Algorithm output: ' + this.result?.result);
  }

  public display(): void {
    if (!this.result) {
      logError('You have to execute algorithm first!');
      return;
    }
    this.displayResult();
  }

  public execute(): void {
    const result = this.run(this.payload);
    this.result = result;
  }
}
