export enum UtilityPossibleValues {
  CREATE_RANDOM_NUMBERS_FILE = 'CREATE_RANDOM_NUMBERS_FILE',
}
export interface UtilityAction {
  name: string;
  value: UtilityPossibleValues;
}
