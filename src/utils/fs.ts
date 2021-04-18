import fs from 'fs-extra';

export const checkIfExist = (path: string): boolean => fs.existsSync(path);
export const mkdir = (path: string): void => fs.mkdirSync(path);
