import { API_URL, API_KEY } from '../../../env';
import { TitlesResponse } from './Titles.interface';

export const getMovies: (title: string) => Promise<TitlesResponse> = (title) => {
  return fetch(
    `${API_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURI(title)}`
  )
    .then((response) => response.json())
    .catch((err) => {
      throw new Error('Não foi impossível consultar os Filmes.');
    });
};
