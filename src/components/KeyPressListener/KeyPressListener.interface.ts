export interface IKeyPressListener {
  handle?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IKeyPressContext {
  keyIndex: number;
  setKeyIndex: (newState: number) => void;

  rowIndex: number;
  setRowIndex: (newState: number) => void;
}
