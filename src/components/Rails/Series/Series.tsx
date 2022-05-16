import { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../../../context/AppContext';
import { SeriesResult } from './Series.interface';
import { getSeries } from './Series.utils';
import { limitString, resouceAvailaible } from '../Rails.utils';
import './Series.css';
import { Loading } from '../Loading';

export const SeriesRails: React.FC<{ onRails: boolean }> = ({ onRails }) => {
  const seriesContainer = useRef<HTMLDivElement>(null);
  const {
    searchValue,
    railsFocus,
    seriesRailsFocus,
    setSeriesRailsFocus,
    lastKeyEventCode,
    setLastKeyEventCode
  } = useContext(AppContext);
  const [series, setSeries] = useState<SeriesResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await getSeries(searchValue);

      let { results } = data;
      results = results.filter((serie) => resouceAvailaible(serie, 'backdrop_path'));

      data && setSeries(results);
      setIsLoading(false);
    })();
  }, [searchValue]);

  const NoResultsComponent = () => <div className="no-results">Nenhum resultado encontrado.</div>;

  useEffect(() => {
    switch (lastKeyEventCode) {
      case 'ArrowLeft':
        if (seriesContainer.current && railsFocus === 1) {
          seriesContainer.current.scrollLeft -= 252;
        }
        break;

      case 'ArrowRight':
        if (seriesContainer.current && railsFocus === 1) {
          if (seriesRailsFocus === series.length) {
            setSeriesRailsFocus(0);
            seriesContainer.current.scrollLeft = 0;
          } else if (seriesRailsFocus > 0) {
            seriesContainer.current.scrollLeft += 252;
          }
        }
        break;
    }

    setLastKeyEventCode('');
  }, [
    lastKeyEventCode,
    seriesRailsFocus,
    railsFocus,
    setLastKeyEventCode,
    series,
    setSeriesRailsFocus
  ]);

  return (
    <div className="series-rails">
      <h2>Series</h2>
      {isLoading && <Loading />}

      {!isLoading && (
        <div className="series" ref={seriesContainer}>
          {series.map((serie, i) => (
            <div
              className={`serie-item ${
                onRails && seriesRailsFocus === i && railsFocus === 1 && 'active'
              }`}>
              <img src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`} alt={serie.name} />
              <div className="serie-details">
                <span>{limitString(serie.original_name, 25)}</span>
                <h3>{serie.name}</h3>
                <p>{limitString(serie.overview, 220, 'Descrição não disponível.')}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchValue !== '' && series.length === 0 && !isLoading && NoResultsComponent()}
    </div>
  );
};
