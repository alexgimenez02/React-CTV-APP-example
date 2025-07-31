export interface Movie {
    title: string
    backdrop_path: string
    poster_path: string
    overview: string
    id: number
}

export interface MovieAPI {
    total_pages: number
    page: number
    results: Movie[]
}