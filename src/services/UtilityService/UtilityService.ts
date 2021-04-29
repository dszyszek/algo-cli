import { Utility } from '../../classes/Utility/Utility';

export class UtilityService {
  public generateRandomNumbers(quantity: number): number[] {
    const randomNumbers: number[] = Utility.generateRandomNumbers(quantity);
    return randomNumbers;
  }
}
