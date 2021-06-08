export class Movie {
    Poster: string;
    Title: string;
    Type: string;
    Year: Date;
    imdbID: string;
}

export class MoviesListResponse {
    Response: boolean;
    Search: Movie[] = [];
    totalResults: string;
}