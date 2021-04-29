import inquirer from 'inquirer';
import { UtilityPossibleActionValues } from '../models/utility-actions';

interface UtilityActionsResponse {
  utility_action: UtilityPossibleActionValues;
}

export async function utilityActionsQuestion(): Promise<UtilityActionsResponse> {
  const optionsList: any[] = [
    {
      name: 'Generate random numbers file',
      value: UtilityPossibleActionValues.CREATE_RANDOM_NUMBERS_FILE,
    },
  ];

  return inquirer.prompt({
    name: 'utility_action',
    type: 'list',
    message: 'Select autility action',
    choices: optionsList,
  });
}
