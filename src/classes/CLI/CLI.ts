import { CLIAbstract } from './CLIAbstract';
import { logSuccess, logError } from '../../utils/logger';
import { mainOptionsQuestion } from '../../questions/main-options';
import { AlgorithmPossibleActions } from '../../models/algorithm-actions';
import { fileNameQuestion, filePathQuestion } from '../../questions/utility';
import { checkIfExist, createFile } from '../../utils/fs';
import newAlgorithmFileTemplate from '../../templates/new-algorithm-template';

export class CLI extends CLIAbstract {
  protected handleMainQuestions = async () => {
    const { main_options } = await mainOptionsQuestion();

    switch (main_options) {
      case AlgorithmPossibleActions.CREATE_ALGORITHM:
        const { file_name } = await fileNameQuestion(
          'Input name of new algorithm file',
        );
        const { file_path } = await filePathQuestion(
          'Input path to new algorithm file',
        );
        const newFilePath = `${file_path}/${file_name}`;

        const fileExist = checkIfExist(newFilePath);

        if (!fileExist) {
          const newFilePath = `${file_path}/${file_name}.ts`;
          createFile(newFilePath, newAlgorithmFileTemplate);
          logSuccess('File generated!');
        } else {
          // TODO: handle question if user want to override file
          logError('File already exists - aborting!');
        }

        break;
    }
  };
}
