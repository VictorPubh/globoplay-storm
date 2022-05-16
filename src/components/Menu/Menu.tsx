import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { MenuOptions } from '../../components/Menu/Menu.mock';
import './Menu.css';

export const Menu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { sessionFocus, menuFocus } = useContext(AppContext);

  useEffect(() => {
    setMenuIsOpen(sessionFocus === 0);
  }, [sessionFocus]);

  return (
    <div className="sidebar">
      <ul className="sidebar-options">
        {MenuOptions.map(({ icon, label }, currentIndex) => (
          <li className={`${menuFocus === currentIndex && menuIsOpen && 'active'}`}>
            <i className={`gg-${icon}`} />
            {menuIsOpen && <span> {label} </span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
