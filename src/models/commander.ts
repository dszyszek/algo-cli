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
    option: ['-f --from <source>', 'Input source of algorithm payload file.'],
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
      '-q, --quantity <number>',
      'Quantity of random numbers to generate',
    ],
    choices: null,
  },
  {
    option: [
      '-U, --utility_action <action>',
      'Select utility action you want to do.',
    ],
    choices: ['generate_numbers'],
  },
  {
    option: [
      '-np, --numbers_payload <payload>',
      'Numbers to input as payload for algorithm (type in; comma separated)',
    ],
    choices: null,
  },
  {
    option: [
      '-fp, --file_payload <path>',
      'Numbers to input as payload for algorithm (from file)',
    ],
    choices: null,
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
