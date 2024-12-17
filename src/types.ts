
export type Review = {
    review_id: number
    review_content: string
    userId: string
    tvdb_id: number
    cringe_score_vote: number
    date_created: Date
    date_updated: Date | null
}


// 0.0 - 0.25 Safe 
// 0.26 - 0.5 Caution
// 0.51 - 0.75 Unsafe
// 0.76 - 1.0 Danger
export enum RatingCode {
    BaseSafeLimit = 0.25,
    BaseCautionLimit = 0.5,
    BaseUnsafeLimit = 0.75,
    BaseDangerLimit = 1
}

export type TV_Show = {
    description: string | null;
    tvdb_id: number;
    name: string;
    aggregate_cringe_rating: number | null;
    first_air_date: Date;
    last_air_date: Date | null;
    series_status: string | null;
    poster_link: string | null;
    original_country: string;
    genres: Genre[] | null;
    content_ratings: ContentRating[] | null;
    reviews: Review[] | null;
}

export type TV_Show_Basic = {
    tvdb_id: number;
    name: string;
    aggregate_cringe_rating: number | null;
    first_air_date: Date;
    poster_link: string | null;
    original_country: string;
}


export type TVDBShow = {
    id: number
    tvdb_id: number;
    name: string;
    slug: string;
    image: string;
    nameTranslations: string[];
    overviewTranslations: string[];
    aliases: {
        language: string;
        name: string;
    }[];

    firstAired: string;
    lastAired: string;
    nextAired: string;
    score: number;
    status: {
        id: number | null;
        name: string | null;
        recordType: string;
        keepUpdated: boolean;
    };

    originalCountry: string;
    originalLanguage: string;
    defaultSeasonType: number;
    isOrderRandomized: boolean;
    lastUpdated: string;
    averageRuntime: number;
    episodes: null;
    overview: string;
    year: string;
}

export type Genre = {
    genre_id: number;
    genre_name: string;
}

export type ContentRating = {
    content_rating_id: number;
    content_rating: string;
    rating_country: string;
    content_rating_description: string;
}

export type ContentRatingResponse = {
    data: ContentRating[]
    status: string
}


export type GenreResponse = {
    data: Genre[]
    status: string
    slug: string
}


export interface TVDB_Response {
    status: string
    data: TVDBShow[]
    links: {
        prev: string,
        self: string,
        next: string,
        total_items: number,
        page_size: number
    }
}

export interface TVDB_Extended {

    aliases: Array<{
        name: string;
        slug: string;
    }>;

    artworks: Array<unknown>;

    audioLanguages: Array<string>;

    awards: Array<unknown>;

    boxOffice: string;

    boxOfficeUS: string;

    budget: string;

    characters: Array<unknown>;

    companies: {
        id: number;
        name: string;
        slug: string;
    };

    contentRatings: Array<ContentRating>;

    first_release: {
        id: number;
        release_date: string;
        country: {
            id: number;
            name: string;
            slug: string;
        };
    };

    genres: Array<Genre>;

    id: number;

    image: string;

    inspirations: Array<unknown>;

    lastUpdated: string;

    lists: Array<unknown>;

    name: string;

    nameTranslations: Array<unknown>;

    originalCountry: string;

    originalLanguage: string;

    overviewTranslations: Array<unknown>;

    production_countries: Array<string>;

    releases: Array<unknown>;

    remoteIds: Array<unknown>;

    runtime: number | null;

    score: number;

    slug: string;

    spoken_languages: Array<string>;

    status: {
        id: number;
        name: string;
    };

    studios: Array<unknown>;

    subtitleLanguages: Array<string>;

    tagOptions: Array<unknown>;

    trailers: Array<unknown>;

    translations: {
        id: number;
        name: string;
        slug: string;
        overview: string;
        first_release: {
            id: number;
            release_date: string;
            country: {
                id: number;
                name: string;
                slug: string;
            };
        };
    };

    year: string;
}

export interface Extended_Response {
    status: string,
    data: TVDB_Extended
}

