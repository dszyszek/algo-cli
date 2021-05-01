import { Command } from '../../classes/Command/Command';
import { ICommand } from '../../classes/Command/types';

export class CommandService {
  private commandInstance: ICommand;
  constructor() {
    this.commandInstance = new Command();
  }
}
