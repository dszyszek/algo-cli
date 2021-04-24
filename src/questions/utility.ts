import inquirer from 'inquirer';

type InquirerType = 'input' | 'confirm';
type InquirerDefaultValueType = string | boolean;
interface InputQuestionResponse<T> {
  answer: T;
}

async function inquirerQuestion<T>(
  type: InquirerType,
  passedMessage: string,
  defaultValue: InquirerDefaultValueType,
): Promise<InputQuestionResponse<T>> {
  return inquirer.prompt({
    name: 'answer',
    type,
    message: passedMessage,
    default: defaultValue,
  });
}

export async function fileNameQuestion(
  passedMessage?: string,
): Promise<string> {
  const randomName: string = 'algo-' + Math.floor(Math.random() * 10000);
  const defaultMessage = 'Enter file name';
  let message = passedMessage ?? defaultMessage;

  const { answer } = await inquirerQuestion<string>(
    'input',
    message,
    randomName,
  );
  return answer;
}

export async function filePathQuestion(
  passedMessage?: string,
): Promise<string> {
  const defaultFilePath = './';
  const defaultMessage = 'Enter file path';
  let message = passedMessage ?? defaultMessage;

  const { answer } = await inquirerQuestion<string>(
    'input',
    message,
    defaultFilePath,
  );
  return answer;
}

export async function fileOverrideQuestion(
  passedMessage?: string,
): Promise<boolean> {
  const defaultAnswer = false;
  const defaultMessage = 'File already exist, want to override?';
  let message = passedMessage ?? defaultMessage;

  const { answer } = await inquirerQuestion<boolean>(
    'confirm',
    message,
    defaultAnswer,
  );
  return answer;
}
