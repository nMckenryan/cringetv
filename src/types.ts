

export type ContentRatingResponse = {
    data: ContentRating[]
    status: string
}

export type Review = {
    review_id: number
    review_content: string
    userId: string
    tvdb_id: number
    cringe_score_vote: number
    review_rating: number
}

export type TV_Show = {
    tvdb_id: number
    name: string,
    description: string,
    content_rating_id: number,
    content_rating: ContentRating[],
    aggregate_cringe_rating: number,
    reviews: Review[],
    first_air_date: Date,
    final_air_date: Date,
    series_status: string,
    poster_link: string,
    genre: Genre[],
    original_country: string,
}


export type TVDBShow = {
    id: number;
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
    id: number;
    name: string;
}

export type ContentRating = {
    description: string;
    id: number;
    name: string;
    country: string;
    contentType: string;
    order: number;
    fullName: string;
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

