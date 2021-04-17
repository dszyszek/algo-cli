export enum CompareAlborithmsBy {
  COMPARE_BY_PERFORMANCE = 'COMPARE_BY_PERFORMANCE',
}

export enum CompareAlgorithmsMain {
  COMPARE_ALGORITHMS = 'COMPARE_ALGORITHMS',
}

export interface CompareAlgorithms {
  name: string;
  value: CompareAlborithmsBy | CompareAlgorithmsMain;
}
