import {
  PassedAlgorithmArgs,
  AlgorithmResult,
  IAlgorithmAbstract,
} from './types';

export abstract class AlgorithmAbstract implements IAlgorithmAbstract {
  public run(args: PassedAlgorithmArgs): AlgorithmResult {
    throw Error('method not implemented');
  }
}
