import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { IKeyPressListener } from './KeyPressListener.interface';
import { MenuOptions } from '../../components/Menu/Menu.mock';
import { keys } from '../Search/Search.mock';

export const KeyPressListener = ({ ...props }: IKeyPressListener) => {
  const { setLastKeyEventCode } = useContext(AppContext);
  const {
    sessionFocus,
    setSessionFocus,
    menuFocus,
    setMenuFocus,

    keyboardV,
    setKeyboardV,
    keyboardH,
    setKeyboardH,

    searchValue,
    setSearchValue,

    railsFocus,
    setRailsFocus,
    titlesRailsFocus,
    setTitlesRailsFocus,
    seriesRailsFocus,
    setSeriesRailsFocus
  } = useContext(AppContext);

  const handlePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKeyEventCode(event.code);

    // Menu
    if (sessionFocus === 0) {
      switch (event.code) {
        case 'ArrowRight':
          setSessionFocus(sessionFocus + 1);
          break;

        case 'ArrowDown':
          setMenuFocus(menuFocus === MenuOptions.length - 1 ? 0 : menuFocus + 1);
          break;

        case 'ArrowUp':
          setMenuFocus(menuFocus === 0 ? MenuOptions.length - 1 : menuFocus - 1);
          break;
      }
    }

    // Search
    if (sessionFocus === 1) {
      switch (event.code) {
        case 'ArrowLeft':
          if (keyboardH === 0) {
            setSessionFocus(0);
          } else {
            setKeyboardH(keyboardH - 1);
          }
          break;

        case 'ArrowRight':
          if (
            (keyboardH === keys[0].length - 1 && searchValue.length !== 0) ||
            (keyboardV === keys.length - 1 &&
              keyboardH === keys[keys.length - 1].length - 1 &&
              searchValue.length !== 0)
          ) {
            setSessionFocus(2);
          } else if (
            (keyboardH === keys[0].length - 1 && searchValue.length === 0) ||
            (keyboardH === keys[keys.length - 1].length - 1 &&
              keyboardV === keys.length - 1 &&
              searchValue.length === 0)
          ) {
            setKeyboardH(0);
          } else {
            setKeyboardH(keyboardH + 1);
          }
          break;

        case 'ArrowUp':
          if (keyboardV === 0 && keyboardH < keys[0].length / 2) {
            setKeyboardH(0);
          } else if (keyboardV === 0 && keyboardH > keys[0].length / 2 - 1) {
            setKeyboardH(1);
          }

          if (keyboardV === keys.length - 1 && keyboardH === 1) {
            setKeyboardH(5);
          }

          setKeyboardV(keyboardV === 0 ? keys.length - 1 : keyboardV - 1);
          break;

        case 'ArrowDown':
          if (keyboardV === keys[0].length - 1 && keyboardH < keys[0].length / 2) {
            setKeyboardH(0);
          } else if (keyboardV === keys[0].length - 1 && keyboardH > keys[0].length / 2 - 1) {
            setKeyboardH(1);
          }

          if (keyboardV === keys.length - 1 && keyboardH === 1) {
            setKeyboardH(keys[0].length - 1);
          }

          setKeyboardV(keyboardV === keys.length - 1 ? 0 : keyboardV + 1);
          break;

        case 'Enter':
          setSearchValue(keys[keyboardV][keyboardH].apply(searchValue));
          break;
      }
    }

    // Rails
    if (sessionFocus === 2) {
      switch (event.code) {
        case 'ArrowLeft':
          if (
            (titlesRailsFocus === 0 && railsFocus === 0) ||
            (seriesRailsFocus === 0 && railsFocus === 1)
          ) {
            setSessionFocus(1);
          } else {
            if (railsFocus === 0) {
              setTitlesRailsFocus(titlesRailsFocus - 1);
            } else {
              setSeriesRailsFocus(seriesRailsFocus - 1);
            }
          }
          break;

        case 'ArrowRight':
          if (railsFocus === 0) {
            setTitlesRailsFocus(titlesRailsFocus + 1);
          } else {
            setSeriesRailsFocus(seriesRailsFocus + 1);
          }
          break;

        case 'ArrowUp':
          if (railsFocus === 1) {
            setRailsFocus(0);
          } else {
            setRailsFocus(1);
          }
          break;

        case 'ArrowDown':
          if (railsFocus === 0) {
            setRailsFocus(1);
          } else {
            setRailsFocus(0);
          }
          break;

        case 'Enter':
          break;
      }
    }
  };

  return <input type="text" className="hidden" onKeyDown={handlePress} autoFocus {...props} />;
};
