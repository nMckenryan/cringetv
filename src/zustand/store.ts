
import { create } from 'zustand'
import { type Review, type TV_Show } from '~/types'

export type TVStore = {
    tv_data: [],
    loading: boolean,
    error: string
    populate_tv_data: () => void,
    set_loading: () => void,
}


const shows: TV_Show[] = [
    {
        name: "The Office",
        description: "The best show ever",
        content_rating: [
            {
                id: 1,
                name: "G",
                country: "USA",
                description: "No description available",
                contentType: null,
                order: null,
                fullName: null,
            },
        ],
        aggregate_cringe_rating: 2.4,
        reviews: [],
        first_air_date: new Date("2/4/2004"),
        final_air_date: new Date(),
        series_status: "Ended",
        poster_link:
            "https://artworks.thetvdb.com/banners/posters/73244-1.jpg",
        tvdb_id: 1,
        genre: [
            {
                id: 0,
                name: "Comedy",
            },
        ],
        original_country: "USA",
    },
    {
        name: "Parks and Recreation",
        description: "The best show ever",
        content_rating: [
            {
                id: 1,
                name: "PG",
                country: "USA",
                description: "No description available",
                contentType: null,
                order: null,
                fullName: null,
            },
        ],
        aggregate_cringe_rating: 2.4,
        reviews: [],
        first_air_date: new Date("2/4/2009"),
        final_air_date: new Date(),
        series_status: "Ended",
        poster_link:
            "https://m.media-amazon.com/images/M/MV5BZmI2NWIyMTQtMWZjYS00NWI3LWEzYjQtNDM4YzUwMDc1YjY5XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        tvdb_id: 2,
        genre: [
            {
                id: 0,
                name: "Comedy",
            },
        ],
        original_country: "USA",
    },
    {
        name: "The Good Place",
        description: "The best show ever",
        content_rating: [
            {
                id: 1,
                name: "PG",
                country: "USA",
                description: "No description available",
                contentType: null,
                order: null,
                fullName: null,
            },
        ],
        aggregate_cringe_rating: 2.4,
        reviews: [],
        first_air_date: new Date("2/4/2016"),
        final_air_date: new Date(),
        series_status: "Ended",
        poster_link:
            "https://m.media-amazon.com/images/M/MV5BYmY3ZjcxY2QtM2Y3NC00YTUwLWEzYjktZmYwYTcxOGYxNDAyXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        tvdb_id: 3,
        genre: [
            {
                id: 0,
                name: "Comedy",
            },
        ],
        original_country: "USA",
    },
    {
        name: "Brooklyn Nine-Nine",
        description: "The best show ever",
        content_rating: [
            {
                id: 1,
                name: "PG",
                country: "USA",
                description: "No description available",
                contentType: null,
                order: null,
                fullName: null,
            },
        ],
        aggregate_cringe_rating: 2.4,
        reviews: [],
        first_air_date: new Date("2/4/2013"),
        final_air_date: new Date(),
        series_status: "Ended",
        poster_link:
            "https://m.media-amazon.com/images/M/MV5BZDM4MjE0MTQtMzcxZS00NzcxLWE5OGEtN2M2NGM0ODg1MjE4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        tvdb_id: 4,
        genre: [
            {
                id: 0,
                name: "Comedy",
            },
        ],
        original_country: "USA",
    },
    {
        name: "Arrested Development",
        description: "The best show ever",
        content_rating: [
            {
                id: 1,
                name: "PG",
                country: "USA",
                description: "No description available",
                contentType: null,
                order: null,
                fullName: null,
            },
        ],
        aggregate_cringe_rating: 2.4,
        reviews: [],
        first_air_date: new Date("2/4/2003"),
        final_air_date: new Date(),
        series_status: "Ended",
        poster_link:
            "https://m.media-amazon.com/images/M/MV5BZmE3NWE3NjQtMWQ0Ny00ZjY4LWI2MDQtODVjMzU0ZjZlYmNlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        tvdb_id: 5,
        genre: [
            {
                id: 0,
                name: "Comedy",
            },
        ],
        original_country: "USA",
    },
    {
        name: "The Big Bang Theory",
        description: "The best show ever",
        content_rating: [
            {
                id: 1,
                name: "PG",
                country: "USA",
                description: "No description available",
                contentType: null,
                order: null,
                fullName: null,
            },
        ],
        aggregate_cringe_rating: 2.4,
        reviews: [],
        first_air_date: new Date("2/4/2007"),
        final_air_date: new Date(),
        series_status: "Ended",
        poster_link:
            "https://m.media-amazon.com/images/M/MV5BNzQ5MjQxMzQ1OF5BMl5BanBnXkFtZTgwNzA4MDMzMTE@._V1_.jpg",
        tvdb_id: 6,
        genre: [
            {
                id: 0,
                name: "Comedy",
            },
        ],
        original_country: "USA",
    },
    {
        name: "The Marvelous Mrs. Maisel",
        description: "The best show ever",
        content_rating: [
            {
                id: 1,
                name: "PG",
                country: "USA",
                description: "No description available",
                contentType: null,
                order: null,
                fullName: null,
            },
        ],
        aggregate_cringe_rating: 2.4,
        reviews: [],
        first_air_date: new Date("2/4/2017"),
        final_air_date: new Date(),
        series_status: "Ended",
        poster_link:
            "https://m.media-amazon.com/images/M/MV5BY2I4MWE5YmUtNjg3NC00ZjE5LWIwOWMtMmE4NzhiY2Q1NjQ4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        tvdb_id: 7,
        genre: [
            {
                id: 0,
                name: "Comedy",
            },
        ],
        original_country: "USA",
    },
    {
        name: "Schitt's Creek",
        description: "The best show ever",
        content_rating: [
            {
                id: 1,
                name: "PG",
                country: "Canada",
                description: "No description available",
                contentType: null,
                order: null,
                fullName: null,
            },
        ],
        aggregate_cringe_rating: 2.4,
        reviews: [],
        first_air_date: new Date("2/4/2015"),
        final_air_date: new Date(),
        series_status: "Ended",
        poster_link:
            "https://m.media-amazon.com/images/M/MV5BZmI3ZjcxY2QtM2Y3NC00YTUwLWEzYjktZmYwYTcxOGYxNDAyXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        tvdb_id: 8,
        genre: [
            {
                id: 0,
                name: "Comedy",
            },
        ],
        original_country: "Canada",
    },
];

const reviews: Review[] = [
    {
        review_id: 1,
        review_content:
            "I loved watching The Office with my family. The characters are so relatable and the humor is spot on. I especially loved the episode  where Michael does the 'Dundies' at the Chili's. It's a classic!",
        userId: "1",
        tvdb_id: 1,
        cringe_score_vote: 4.0,
        review_rating: 5,
    },
    {
        review_id: 2,
        review_content:
            "I didn't really like The Office. It's just not my kind of humor. I found the characters to be pretty annoying.",
        userId: "2",
        tvdb_id: 1,
        cringe_score_vote: 0.1,
        review_rating: 1,
    },
    {
        review_id: 3,
        review_content:
            "I thought The Office was just okay. I liked some of the characters but others were just too much.",
        userId: "3",
        tvdb_id: 1,
        cringe_score_vote: 2.0,
        review_rating: 3,
    },
    {
        review_id: 4,
        review_content:
            "The Office is my favorite show. I've seen it so many times but it never fails to make me laugh. Steve Carell is a genius.",
        userId: "4",
        tvdb_id: 1,
        cringe_score_vote: 1.0,
        review_rating: 5,
    },
];




export const useTVStore = create((set) => ({
    tv_data: shows,
    review_data: reviews,
    loading: true,
    error: "",
    // populate_tv_data: (tv: TVDBShow[] | null) => set({ tv_data: tv ?? [] }),
    populate_tv_data: (tv: TV_Show[] | null) => set({ tv_data: tv ?? [] }),
    get_tv_data_by_id: (id: number) => set((state: { tv_data: TV_Show[]; }) => ({ tv_data: state.tv_data.find((tv) => tv.tvdb_id === id) ?? [] })),

    set_loading: () => set({ loading: false }),
    set_error: (error: string) => set({ error: error }),
}))
