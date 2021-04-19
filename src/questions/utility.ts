import inquirer from 'inquirer';

interface FileNameQuestionResponse {
  file_name: string;
}
interface FilePathQuestionResponse {
  file_path: string;
}

export async function fileNameQuestion(
  passedMessage?: string,
): Promise<FileNameQuestionResponse> {
  const randomName: string = 'algo-' + Math.floor(Math.random() * 10000);
  const defaultMessage = 'Enter file name';
  let message = passedMessage ?? defaultMessage;

  return inquirer.prompt({
    name: 'file_name',
    type: 'input',
    message,
    default: randomName,
  });
}

export async function filePathQuestion(
  passedMessage?: string,
): Promise<FilePathQuestionResponse> {
  const defaultFilePath = './';
  const defaultMessage = 'Enter file path';
  let message = passedMessage ?? defaultMessage;

  return inquirer.prompt({
    name: 'file_path',
    type: 'input',
    message,
    default: defaultFilePath,
  });
}
