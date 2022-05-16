import { IKeys } from './Search.interface';

export const createKeyObject = (
  label: string,
  icon?: string,
  apply?: (value: string) => string
) => {
  const Object: IKeys = {
    label: label,
    apply: apply ? apply : (value: string) => (value += label)
  };

  if (icon) Object['icon'] = icon;

  return Object;
};

export const createKeys = (sequence: number, startCode: number) => {
  return Array.from(Array(sequence).keys()).map((subCode) => {
    const letter = String.fromCharCode(subCode + startCode);
    return createKeyObject(letter);
  });
};
