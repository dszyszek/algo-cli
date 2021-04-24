export const parseToIntArray = (str: string): Array<number> =>
  str.split(',').map((x) => parseInt(x));
