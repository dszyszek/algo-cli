import { CLIAbstract } from './CLIAbstract';
import { File } from '../File/File';
import { fileNameQuestion, filePathQuestion } from '../../questions/utility';

export class CLI extends CLIAbstract {
  protected async handleCreateAlgorithm(): Promise<void> {
    const { file_name } = await fileNameQuestion(
      'Input name of the new algorithm file',
    );
    const { file_path } = await filePathQuestion(
      'Input path to the new algorithm file',
    );

    new File(file_name, file_path);
  }

  protected handleRunAlgorithm(): void {
    console.log('Handle run algorithm');
  }

  protected handleAlgorithmCompare(): void {
    console.log('Handle algorithm compare');
  }

  protected handleUtilityActions(): void {
    console.log('Handle utility actions');
  }
}
