import inquirer from 'inquirer';
import { CompareAlborithmsBy } from '../models/algorithm-compare';

interface AlgorithmComparePayloadResponse {
  algorithm_compare_payload: CompareAlborithmsBy;
}

export async function algorithmComparePayloadQuestion(): Promise<AlgorithmComparePayloadResponse> {
  const optionsList: any[] = [
    {
      name: 'By performance',
      value: CompareAlborithmsBy.COMPARE_BY_PERFORMANCE,
    },
  ];

  return inquirer.prompt({
    name: 'algorithm_compare_payload',
    type: 'list',
    message: 'By what you want to compare algorithms?',
    choices: optionsList,
  });
}
