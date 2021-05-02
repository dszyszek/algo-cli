export enum CompareAlborithmsBy {
  COMPARE_BY_PERFORMANCE = 'performance',
}

export enum CompareAlgorithmsMain {
  COMPARE_ALGORITHMS = 'compare',
}

export interface CompareAlgorithms {
  name: string;
  value: CompareAlborithmsBy | CompareAlgorithmsMain;
}
