export enum AlgorithmPossibleActions {
  CREATE_ALGORITHM = 'CREATE_ALGORITHM',
  RUN_ALGORITHM = 'RUN_ALGORITHM',
}
export interface AlgorithmAction {
  name: string;
  value: AlgorithmPossibleActions;
}
