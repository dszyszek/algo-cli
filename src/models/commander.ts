import { AlgorithmPossibleActions } from '../models/algorithm-actions';
import { CompareAlgorithmsMain } from '../models/algorithm-compare';
import { UtilityActionMain } from '../models/utility-actions';

export type SelectModeAnswer = 'create' | 'run' | 'compare' | 'utility';
export type TCommandOption = [string, string];
export type TCommand = {
  option: TCommandOption;
  choices: string[] | null;
};

export const COMMAND_OPTIONS: TCommand[] = [
  {
    option: ['-m, --mode  <mode>', 'Compare algorithms.'],
    choices: ['create', 'run', 'compare', 'utility'],
  },
  {
    option: ['-o, --output_path <path>', 'Path to the output file'],
    choices: null,
  },
  {
    option: ['-n, --name <name>', 'Name of the file'],
    choices: null,
  },
  {
    option: [
      '-b, --compare_by <compare_by>',
      'Select by what you want to compare algorithms.',
    ],
    choices: ['performance'],
  },
  {
    option: ['-f --from <from>', 'Input source of algorithm payload file.'],
    choices: ['file', 'yourself', 'generate'],
  },
  {
    option: [
      '-i, --input_path <path>',
      'Type in path to the input file (algorithm etc.)',
    ],
    choices: null,
  },
  {
    option: [
      '-q, --quantity <quantity>',
      'Quantity of random numbers to generate',
    ],
    choices: null,
  },
  {
    option: [
      '-U, --utility_action <utility_action>',
      'Select utility action you want to do.',
    ],
    choices: ['generate_numbers'],
  },
];

export const COMMANDER_DESCRIPTION: string =
  'Create/run/compare algorithms with ease';

export const COMMAND_TO_ACTION_MAP = {
  create: AlgorithmPossibleActions.CREATE_ALGORITHM,
  run: AlgorithmPossibleActions.RUN_ALGORITHM,
  compare: CompareAlgorithmsMain.COMPARE_ALGORITHMS,
  utility: UtilityActionMain.UTILITY_ACTIONS,
};
