export enum FileOptionsValues {
  OUTPUT_DIRECTORY = 'OUTPUT_DIRECTORY',
  FILE_NAME = 'FILE_NAME',
}

export type FileOptions = {
  name: string;
  value: FileOptionsValues;
};
