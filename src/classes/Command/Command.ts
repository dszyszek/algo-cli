import { Command as Commander, Option } from 'commander';
import { ICommand } from './types';
import { TCommand } from '../../models/commander';

export class Command implements ICommand {
  private commanderInstance;
  constructor() {
    this.commanderInstance = new Commander();
  }

  public get currentOptions() {
    return this.commanderInstance.opts();
  }

  public set options(options: TCommand[]) {
    options.forEach((opt) => {
      const { option, choices } = opt;

      if (choices) {
        const newOption = new Option(...option).choices(choices);
        this.commanderInstance.addOption(newOption);
      } else {
        this.commanderInstance.option(...option);
      }
    });
  }

  public set description(description: string) {
    this.commanderInstance.description(description);
  }

  public parse(parseArgs?: string[]): void {
    this.commanderInstance.parse(parseArgs);
  }
}
