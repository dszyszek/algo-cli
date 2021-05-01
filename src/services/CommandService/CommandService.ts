import { Command } from '../../classes/Command/Command';
import { ICommand } from '../../classes/Command/types';
import {
  COMMAND_OPTIONS,
  COMMANDER_DESCRIPTION,
  TCommand,
} from '../../models/commander';

export class CommandService {
  private commandInstance: ICommand;
  private argSource: string[];

  constructor(argSource: string[]) {
    this.commandInstance = new Command();
    this.argSource = argSource;
  }

  public get options() {
    return this.commandInstance.currentOptions;
  }

  private setOptions(options: TCommand[]): void {
    this.commandInstance.options = options;
  }

  private setDescription(description: string): void {
    this.commandInstance.description = description;
  }

  private prepare(): void {
    this.setOptions(COMMAND_OPTIONS);
    this.setDescription(COMMANDER_DESCRIPTION);
  }

  public getCommands() {
    this.prepare();
    this.commandInstance.parse(this.argSource);
    return this.options;
  }
}
