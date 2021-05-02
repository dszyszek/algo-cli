export enum UtilityPossibleActionValues {
  CREATE_RANDOM_NUMBERS_FILE = 'generate_numbers',
}

export enum UtilityActionMain {
  UTILITY_ACTIONS = 'utility',
}

export interface UtilityAction {
  name: string;
  value: UtilityPossibleActionValues | UtilityActionMain;
}
