export type TCommand = [string, string];

export const COMMAND_OPTIONS: TCommand[] = [
  [
    '-m, --mode  <mode>',
    'Compare algorithms. Allowed values: ["create", "run", "compare", "utility"]',
  ],
  ['-o, --output_path <path>', 'Path to the output file'],
  ['-n, --name <name>', 'Name of the file'],
  [
    '-b, --compare_by <compare_by>',
    'Select by what you want to compare algorithms. Allowed options: ["performance"]',
  ],
  [
    '-f --from <from>',
    'Input source of algorithm payload file. Allowed options: ["file", "yourself", "generate"]',
  ],
  [
    '-i, --input_path <path>',
    'Type in path to the input file (algorithm etc.)',
  ],
  ['-q, --quantity <quantity>', 'Quantity of random numbers to generate'],
  [
    '-U, --utility_action <utility_action>',
    'Select utility action you want to do. Allowed actions: ["generate_numbers"]',
  ],
];

export const COMMANDER_DESCRIPTION: string =
  'Create/run/compare algorithms with ease';
