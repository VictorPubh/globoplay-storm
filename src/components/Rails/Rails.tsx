import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { SeriesRails } from './Series';
import { TitlesRails } from './Titles';
import './Rails.css';

export const Rails = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [railsIsOpen, setRailsIsOpen] = useState(false);
  const { searchValue, sessionFocus } = useContext(AppContext);

  useEffect(() => {
    setIsSearching(searchValue !== '');
  }, [searchValue]);

  useEffect(() => {
    const onRails = sessionFocus === 2;
    setRailsIsOpen(onRails);
  }, [sessionFocus]);

  return (
    <div className="rails-container">
      {isSearching ? (
        <div className="rails-items">
          <TitlesRails onRails={railsIsOpen} />
          <SeriesRails onRails={railsIsOpen} />
        </div>
      ) : (
        <div className="no-search">
          <h2>Comece a digitar para visualizar sua busca</h2>
        </div>
      )}
    </div>
  );
};
