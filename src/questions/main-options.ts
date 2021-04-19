import inquirer from 'inquirer';
import { AlgorithmPossibleActions } from '../models/algorithm-actions';
import { CompareAlgorithmsMain } from '../models/algorithm-compare';
import { MainOptions } from '../models/main-options';
import { UtilityActionMain } from '../models/utility-actions';

interface MainOptionsResponse {
  main_options: AlgorithmPossibleActions;
}

export async function mainOptionsQuestion(): Promise<MainOptionsResponse> {
  const optionsList: MainOptions[] = [
    {
      name: 'Create algorithm',
      value: AlgorithmPossibleActions.CREATE_ALGORITHM,
    },
    { name: 'Run algorithm', value: AlgorithmPossibleActions.RUN_ALGORITHM },
    {
      name: 'Compare algorithms',
      value: CompareAlgorithmsMain.COMPARE_ALGORITHMS,
    },
    {
      name: 'Utility actions',
      value: UtilityActionMain.UTILITY_ACTIONS,
    },
  ];

  return inquirer.prompt({
    name: 'main_options',
    type: 'list',
    message: 'What do you want to do?',
    choices: optionsList,
  });
}
