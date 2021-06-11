export class Movie {
    id: number;
    Poster: string;
    Title: string;
    Type: string;
    Year: Date;
    imdbID: string;
    rate: number;
}

export class OmdbMovieResponse {
    Response: string;
    Search: Movie[];
    totalResults: number;
}
