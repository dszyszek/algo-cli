import { CompareAlgorithms, CompareAlgorithmsMain } from './algorithm-compare';
import { AlgorithmAction, AlgorithmPossibleActions } from './algorithm-actions';
import { UtilityAction, UtilityActionMain } from './utility-actions';

export type MainOptions = CompareAlgorithms | AlgorithmAction | UtilityAction;
export type MainOptionsTypes =
  | CompareAlgorithmsMain
  | AlgorithmPossibleActions
  | UtilityActionMain;
