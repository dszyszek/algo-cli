import { TCommand } from '../../models/commander';

export interface ICommand {
  readonly currentOptions: any;
  options: TCommand[];
  description: string;
  parse: (parseArgs?: string[]) => void;
}
