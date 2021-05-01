export type TCommandOption = [string, string];
export type TCommand = {
  option: TCommandOption;
  choices: string[] | null;
};

export const COMMAND_OPTIONS: TCommand[] = [
  {
    option: [
      '-m, --mode  <mode>',
      'Compare algorithms. Allowed values: ["create", "run", "compare", "utility"]',
    ],
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
      'Select by what you want to compare algorithms. Allowed options: ["performance"]',
    ],
    choices: ['performance'],
  },
  {
    option: [
      '-f --from <from>',
      'Input source of algorithm payload file. Allowed options: ["file", "yourself", "generate"]',
    ],
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
      'Select utility action you want to do. Allowed actions: ["generate_numbers"]',
    ],
    choices: ['generate_numbers'],
  },
];

export const COMMANDER_DESCRIPTION: string =
  'Create/run/compare algorithms with ease';
