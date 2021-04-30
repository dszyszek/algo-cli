import { IUtility } from './types';

export class Utility implements IUtility {
  public static generateRandomNumbers = (quantity: number): Array<number> => {
    const numbers: Array<number> = [];
    const maxNum: number = quantity * 100000;
    for (let i = 0; i < quantity; i++) {
      let isDuplicate: boolean = true;
      let randomNumber!: number;

      while (isDuplicate) {
        randomNumber = Math.floor(Math.random() * maxNum);
        isDuplicate = numbers.includes(randomNumber);
      }
      numbers.push(randomNumber);
    }

    return numbers;
  };
}
