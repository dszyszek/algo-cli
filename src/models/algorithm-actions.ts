export enum AlgorithmPossibleActions {
  CREATE_ALGORITHM = 'create',
  RUN_ALGORITHM = 'run',
}
export interface AlgorithmAction {
  name: string;
  value: AlgorithmPossibleActions;
}
