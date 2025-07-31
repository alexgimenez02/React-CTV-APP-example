import Api from './api';
import { Movie, MovieAPI } from './types';
const bearerToken = '<Your token here>'
export default class TMDB extends Api {
    constructor() {
        super('https://api.themoviedb.org/3/', {
            accept: 'application/json',
            Authorization: `Bearer ${bearerToken}`,
            }
        )
    }

    public async getMovies(page = 1): Promise<Movie[]> {
        const result = await this.get<MovieAPI>(`discover/movie?${page > 1 ? `page=${page}&` : ''}include_adult?false`)
        if(!result) return []

        return result.results
    }
}