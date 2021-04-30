import inquirer from 'inquirer';
import { AlgorithmPayloadAvailableOptions } from '../models/algorithm-payload-options';

interface AlgorithmPayloadResponse {
  algorithm_payload_options: AlgorithmPayloadAvailableOptions;
}

export async function algorithmPayloadQuestion(): Promise<AlgorithmPayloadResponse> {
  const optionsList: any[] = [
    {
      name: 'From file',
      value: AlgorithmPayloadAvailableOptions.FROM_FILE,
    },
    {
      name: 'Write by yourself in console',
      value: AlgorithmPayloadAvailableOptions.YOURSELF,
    },
    {
      name: 'Generate on fly',
      value: AlgorithmPayloadAvailableOptions.GENERATE_ON_FLY,
    },
  ];

  return inquirer.prompt({
    name: 'algorithm_payload_options',
    type: 'list',
    message: 'Select algorithm input source',
    choices: optionsList,
  });
}
