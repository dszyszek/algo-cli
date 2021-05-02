import { Command } from '../../classes/Command/Command';
import { ICommand } from '../../classes/Command/types';
import {
  COMMAND_OPTIONS,
  COMMANDER_DESCRIPTION,
  TCommand,
} from '../../models/commander';
import { CLI } from '../../classes/CLI';
import { mainOptionsQuestion } from '../../questions/main-options';
import { algorithmComparePayloadQuestion } from '../../questions/compare-algorithms';
import { utilityActionsQuestion } from '../../questions/utility-actions';
import { parseToIntArray } from '../../utils/number';
import { algorithmPayloadQuestion } from '../../questions/algorithm-payload-options';
import { AlgorithmPayloadAvailableOptions } from '../../models/algorithm-payload-options';

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

  public async getMainMode(): Promise<string> {
    const { options } = this;
    if (options.mode) {
      return options.mode;
    }
    const { main_options } = await mainOptionsQuestion();
    return main_options;
  }

  public async getFileName(message?: string): Promise<string> {
    const { options } = this;
    if (options.name) {
      return options.name;
    }
    return await CLI.fileNameQuestion(message);
  }

  public async getOutputPath(message?: string): Promise<string> {
    const { options } = this;
    if (options.output_path) {
      return options.output_path;
    }
    return await CLI.filePathQuestion(message);
  }

  public async getCompareAlgorithmBy(): Promise<string> {
    const { options } = this;
    if (options.compare_by) {
      return options.compare_by;
    }
    const {
      algorithm_compare_payload,
    } = await algorithmComparePayloadQuestion();
    return algorithm_compare_payload;
  }

  public async getSource(): Promise<AlgorithmPayloadAvailableOptions> {
    const { options } = this;
    if (options.source) {
      return options.source;
    }

    const { algorithm_payload_options } = await algorithmPayloadQuestion();
    return algorithm_payload_options;
  }

  public async getInputPath(message?: string): Promise<string> {
    const { options } = this;
    if (options.input_path) {
      return options.input_path;
    }
    return await CLI.filePathQuestion(message);
  }

  public async getQuantity(message: string): Promise<number> {
    const { options } = this;
    if (options.quantity) {
      return options.quantity;
    }
    const quantityRaw: string = await CLI.inputQuestion(message);
    return parseInt(quantityRaw);
  }
  public async getUtilityAction(): Promise<string> {
    const { options } = this;
    if (options.utility_action) {
      return options.utility_action;
    }
    const { utility_action } = await utilityActionsQuestion();
    return utility_action;
  }
  public async getNumbersPayload(message: string): Promise<number[]> {
    const { options } = this;
    if (options.numbers_payload) {
      return options.numbers_payload;
    }
    const rawNumbers = await CLI.inputQuestion(message);
    return parseToIntArray(rawNumbers);
  }

  public async getFilePayload(message?: string): Promise<string> {
    const { options } = this;
    if (options.file_payload) {
      return options.file_payload;
    }
    return await CLI.filePathQuestion(message);
  }

  public getCommands() {
    this.prepare();
    this.commandInstance.parse(this.argSource);
    return this.options;
  }
}
