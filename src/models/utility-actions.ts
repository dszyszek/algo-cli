export enum UtilityPossibleActionValues {
  CREATE_RANDOM_NUMBERS_FILE = 'CREATE_RANDOM_NUMBERS_FILE',
}

export enum UtilityActionMain {
  UTILITY_ACTIONS = 'UTILITY_ACTIONS',
}

export interface UtilityAction {
  name: string;
  value: UtilityPossibleActionValues | UtilityActionMain;
}
