import { IKeys } from './Search.interface';
import { createKeys, createKeyObject } from './Search.utils';

export const keys: Array<IKeys[]> = [
  createKeys(6, 97),
  createKeys(6, 103),
  createKeys(6, 109),
  createKeys(6, 115),
  [...createKeys(2, 121), ...createKeys(4, 48)],
  createKeys(6, 52),
  [
    createKeyObject('espaço', 'arrows-breake-h', (value: string) => {
      return (value += ' ');
    }),
    createKeyObject('apagar', 'backspace', (value: string) => {
      return value.slice(0, value.length - 1);
    })
  ]
];
