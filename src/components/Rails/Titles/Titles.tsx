import { AppContext } from '../../../context/AppContext';
import { TitlesResult } from './Titles.interface';
import { useContext, useEffect, useRef, useState } from 'react';
import { Loading } from '../Loading';
import { resouceAvailaible } from '../Rails.utils';
import { getMovies } from './Titles.utils';
import './Titles.css';

export const TitlesRails: React.FC<{ onRails: boolean }> = ({ onRails }) => {
  const {
    searchValue,
    sessionFocus,
    setSessionFocus,
    railsFocus,
    titlesRailsFocus,
    setTitlesRailsFocus,
    lastKeyEventCode,
    setLastKeyEventCode
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<TitlesResult[]>([]);
  const moviesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await getMovies(searchValue);

      let { results } = data;
      results = results.filter((serie) => resouceAvailaible(serie, 'backdrop_path'));

      data && setMovies(results);
      setIsLoading(false);
    })();
  }, [searchValue]);

  const NoResultsComponent = () => <div className="no-results">Nenhum resultado encontrado.</div>;

  useEffect(() => {
    switch (lastKeyEventCode) {
      case 'ArrowLeft':
        if (moviesContainer.current && railsFocus === 0) {
          moviesContainer.current.scrollLeft -= 184;
        }
        break;

      case 'ArrowRight':
        if (moviesContainer.current && railsFocus === 0) {
          if (titlesRailsFocus === movies.length) {
            setTitlesRailsFocus(0);
            moviesContainer.current.scrollLeft = 0;
          } else if (titlesRailsFocus > 0) {
            moviesContainer.current.scrollLeft += 184;
          }
        }
        break;
    }

    setLastKeyEventCode('');
  }, [
    lastKeyEventCode,
    titlesRailsFocus,
    railsFocus,
    setLastKeyEventCode,
    setTitlesRailsFocus,
    movies
  ]);

  return (
    <div className="titles-rails">
      <h2>Títulos</h2>

      {isLoading && <Loading />}
      {!isLoading && (
        <div className="movies movies-transition" ref={moviesContainer}>
          {movies.map((movie, i) => (
            <div
              className={`post-movie ${
                onRails && railsFocus === 0 && titlesRailsFocus === i && 'active'
              }`}
            >
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
          ))}
        </div>
      )}

      {searchValue !== '' && movies.length === 0 && !isLoading && NoResultsComponent()}
    </div>
  );
};
