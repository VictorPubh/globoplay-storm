import { API_URL, API_KEY } from '../../../env';
import { SeriesResponse } from './Series.interface';

export const getSeries: (title: string) => Promise<SeriesResponse> = (title) => {
  return fetch(`${API_URL}/search/tv?api_key=${API_KEY}&language=pt-BR&query=${encodeURI(title)}`)
    .then((response) => response.json())
    .catch((err) => {
      throw new Error('Não foi impossível consultar as Séries.');
    });
};
