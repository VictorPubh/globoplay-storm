import { AppContext } from '../../context/AppContext';
import { useContext, useState, useEffect } from 'react';
import { keys } from './Search.mock';
import './Search.css';

export const Search = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const { sessionFocus, keyboardH, keyboardV, searchValue } = useContext(AppContext);

  useEffect(() => {
    setSearchIsOpen(sessionFocus === 1);
  }, [sessionFocus]);

  return (
    <div className="virtual-keyboard">
      <input type="text" value={searchValue} className="input-search" placeholder="Busca" />
      <div className="keyboard-row">
        {keys.map((row, r) => (
          <div className="keyboard-grid">
            {row.map((key, k) => (
              <button
                className={`${searchIsOpen && keyboardH === k && keyboardV === r && 'active'}`}>
                {key.icon && <i className={`gg-${key.icon}`} />}
                {key.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
