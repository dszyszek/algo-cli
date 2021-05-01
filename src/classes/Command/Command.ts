import { Command as Commander } from 'commander';
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
      this.commanderInstance.option(...opt);
    });
  }

  public set description(description: string) {
    this.commanderInstance.description(description);
  }

  public parse(parseArgs?: string[]): void {
    this.commanderInstance.parse(parseArgs);
  }
}
