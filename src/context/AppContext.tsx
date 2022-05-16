import { useState, createContext } from 'react';
import { IAppContext, IAppContextProps } from '../App.interface';

const initialValue = {
  sessionFocus: 1,
  setSessionFocus: () => {},

  menuFocus: 0,
  setMenuFocus: () => {},

  searchValue: '',
  setSearchValue: () => {},

  keyboardV: 0,
  setKeyboardV: () => {},
  keyboardH: 0,
  setKeyboardH: () => {},

  railsFocus: 0,
  setRailsFocus: () => {},

  titlesRailsFocus: 0,
  setTitlesRailsFocus: () => {},

  seriesRailsFocus: 0,
  setSeriesRailsFocus: () => {},

  lastKeyEventCode: '',
  setLastKeyEventCode: () => {}
};

export const AppContext = createContext<IAppContext>(initialValue);

export const AppProvider = ({ children }: IAppContextProps) => {
  const [sessionFocus, setSessionFocus] = useState<number>(initialValue.sessionFocus);
  const [menuFocus, setMenuFocus] = useState<number>(initialValue.menuFocus);

  // Keyboard Coordination
  const [keyboardV, setKeyboardV] = useState<number>(initialValue.keyboardV);
  const [keyboardH, setKeyboardH] = useState<number>(initialValue.keyboardH);

  // Keyboard Search
  const [searchValue, setSearchValue] = useState<string>(initialValue.searchValue);

  // Rails
  const [railsFocus, setRailsFocus] = useState<number>(initialValue.railsFocus);
  const [titlesRailsFocus, setTitlesRailsFocus] = useState<number>(initialValue.titlesRailsFocus);
  const [seriesRailsFocus, setSeriesRailsFocus] = useState<number>(initialValue.seriesRailsFocus);

  // Listener
  const [lastKeyEventCode, setLastKeyEventCode] = useState<string>(initialValue.lastKeyEventCode);

  return (
    <AppContext.Provider
      value={{
        sessionFocus,
        setSessionFocus,
        menuFocus,
        setMenuFocus,

        searchValue,
        setSearchValue,

        keyboardV,
        setKeyboardV,
        keyboardH,
        setKeyboardH,

        railsFocus,
        setRailsFocus,
        titlesRailsFocus,
        setTitlesRailsFocus,
        seriesRailsFocus,
        setSeriesRailsFocus,

        lastKeyEventCode,
        setLastKeyEventCode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
