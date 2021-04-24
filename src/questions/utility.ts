import inquirer from 'inquirer';

type InquirerType = 'input' | 'confirm';
type InquirerDefaultValueType = string | boolean;
interface InputQuestionResponse<T> {
  answer: T;
}

export async function inquirerQuestion<T>(
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
