import React from 'react';

export interface IAppContext {
  sessionFocus: number;
  setSessionFocus: (newState: number) => void;

  menuFocus: number;
  setMenuFocus: (newState: number) => void;

  keyboardH: number;
  setKeyboardH: (newState: number) => void;

  keyboardV: number;
  setKeyboardV: (newState: number) => void;

  searchValue: string;
  setSearchValue: (newState: string) => void;

  railsFocus: number;
  setRailsFocus: (newState: number) => void;

  titlesRailsFocus: number;
  setTitlesRailsFocus: (newState: number) => void;

  seriesRailsFocus: number;
  setSeriesRailsFocus: (newState: number) => void;

  lastKeyEventCode: string;
  setLastKeyEventCode: (newState: string) => void;
}

export interface IAppContextProps {
  children: React.ReactNode;
}
