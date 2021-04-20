import { CLIAbstract } from './CLIAbstract';
import { mainOptionsQuestion } from '../../questions/main-options';
import { AlgorithmPossibleActions } from '../../models/algorithm-actions';
import { File } from '../File/File';
import { fileNameQuestion, filePathQuestion } from '../../questions/utility';

export class CLI extends CLIAbstract {
  private async handleCreateAlgorithm(): Promise<void> {
    const { file_name } = await fileNameQuestion(
      'Input name of the new algorithm file',
    );
    const { file_path } = await filePathQuestion(
      'Input path to the new algorithm file',
    );

    new File(file_name, file_path);
  }

  protected handleMainQuestions = async () => {
    const { main_options } = await mainOptionsQuestion();

    switch (main_options) {
      case AlgorithmPossibleActions.CREATE_ALGORITHM:
        this.handleCreateAlgorithm();
        break;
    }
  };
}
