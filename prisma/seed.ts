
import { RatingCode, type ContentRating, type Extended_Response } from '../src/types';
import { db } from "~/server/db";
import { type GenreResponse, type TVDB_Extended, type ContentRatingResponse, type Genre, type TVDB_Response, type TVDBShow } from "~/types";
import {
    RegExpMatcher,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity';

const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});

const tvdb_options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TVDB_TOKEN}`,
    },
};

export function calculateBaseCringeRating(showDetails: TVDB_Extended): number | null {

    const showName = showDetails.name;
    const contentRatings = showDetails.contentRatings[0];
    const year = showDetails.year;

    if (contentRatings === undefined) {
        if (Number(year) <= 1965) {
            return 0.20;
        }
        else {
            return null
        }

    }

    if (Number(year) <= 1965) {
        return 0.20;
    }

    const ratingName = contentRatings.content_rating;
    const ratingNumber = Number((/\d+/.exec(ratingName))?.[0]);

    if (!isNaN(ratingNumber)) {
        return null;
    }
    if (ratingNumber <= 13 || ratingName.toLowerCase().includes("pg") || ratingName.toLowerCase().includes("M")) {
        return RatingCode.BaseSafeLimit.valueOf()
    }
    else if (ratingNumber <= 16) {
        return RatingCode.BaseCautionLimit.valueOf()
    }
    else if (ratingNumber <= 17) {
        return RatingCode.BaseUnsafeLimit.valueOf()
    }
    else if (ratingNumber >= 18) {
        return RatingCode.BaseDangerLimit.valueOf()
    }

    if (matcher.hasMatch(showName)) {
        console.log(showName);
        return RatingCode.BaseUnsafeLimit.valueOf()
    }
    else {
        return null;
    }
}


async function seed_genre_and_content_ratings() {
    const genre: Genre[] = []
    const contentRating: ContentRating[] = []

    await fetch("https://api4.thetvdb.com/v4/genres", tvdb_options)
        .then((response) => response.json() as Promise<GenreResponse>)
        .then((data) => genre.push(...data.data))
        .catch((err) => console.error(err))

    // generate Genres
    async function getGenres(genre_list: Genre[]) {
        for (const g of genre_list) {
            await db.genre.upsert({
                where: { genre_id: g.genre_id },
                update: {},
                create: {
                    genre_id: g.genre_id,
                    genre_name: g.genre_name,
                }
            })
        }
    }


    await fetch("https://api4.thetvdb.com/v4/content/ratings", tvdb_options)
        .then((response) => response.json() as Promise<ContentRatingResponse>)
        .then((data) => contentRating.push
            (...data.data))
        .catch((err) => console.error(err))

    // generate ContentRatings
    async function setContentRatings(content_rating_list: ContentRating[]) {
        for (const cr of content_rating_list) {
            await db.contentRating.upsert({
                where: { content_rating_id: cr.content_rating_id },
                update: {
                    content_rating_id: cr.content_rating_id,
                    content_rating: cr.content_rating,
                    rating_country: cr.rating_country,
                    content_rating_description: cr.content_rating_description ?? "No description available",
                },
                create: {
                    content_rating_id: cr.content_rating_id,
                    content_rating: cr.content_rating,
                    rating_country: cr.rating_country,
                    content_rating_description: cr.content_rating_description ?? "No description available",
                }
            })
        }
    }

    await getGenres(genre);
    console.log("genre seeded");
    await setContentRatings(contentRating)
    console.log("content rating seeded");
}


async function main() {
    const tv_data_from_tmdb: TVDBShow[] = []

    await seed_genre_and_content_ratings();

    await fetch("https://api4.thetvdb.com/v4/series", tvdb_options)
        .then((response) => response.json() as Promise<TVDB_Response>)
        .then((data) => tv_data_from_tmdb.push(...data.data))
        .catch((err) => console.error(err))


    const retrieved_tv = tv_data_from_tmdb;

    if (!retrieved_tv) return;

    for (const show of retrieved_tv) {
        try {
            const extended_response = await fetch(`https://api4.thetvdb.com/v4/series/${show.id}/extended?short=true`, tvdb_options);
            if (!extended_response.ok) {
                console.error(`Failed to fetch extended data for show ID ${show.id}`);
                continue;
            }
            const res = await extended_response.json() as Extended_Response;

            const extended_tv_data: TVDB_Extended = res.data;

            const genres: Genre[] = extended_tv_data.genres;

            const poster = show.image ? `https://www.thetvdb.com${show.image}` : undefined;

            //does not seed if it's a news show
            const omittedGenres = [];

            for (const genre of genres) {
                if (genre.genre_name === "News") {
                    omittedGenres.push(genre);
                }
            }


            if (show !== undefined && omittedGenres.length === 0) {
                await db.televisionShow.upsert({
                    where: { tvdb_id: show.id },
                    update: {
                        tvdb_id: show.id,
                        name: show.name,
                        description: show.overview,
                        aggregate_cringe_rating: calculateBaseCringeRating(extended_tv_data),
                        first_air_date: new Date(show.firstAired),
                        last_air_date: new Date(show.lastAired),
                        series_status: extended_tv_data.status.name,
                        poster_link: poster,
                        genres: {
                            connectOrCreate: genres.map((genre: Genre) => ({
                                where: { genre_id: genre.genre_id },
                                create: {
                                    genre_id: genre.genre_id,
                                    genre_name: genre.genre_name,
                                },
                            })),
                        },
                        content_ratings: {
                            connectOrCreate: extended_tv_data.contentRatings.map((cr: ContentRating) => ({
                                where: { content_rating_id: cr.content_rating_id },
                                create: {
                                    content_rating_id: cr.content_rating_id,
                                    content_rating: cr.content_rating,
                                    rating_country: cr.rating_country,
                                    content_rating_description: cr.content_rating_description ?? "No description available",
                                }
                            })),
                        },
                        original_country: show.originalCountry ?? "Unknown",
                    },
                    create: {
                        tvdb_id: show.id,
                        name: show.name,
                        description: show.overview,
                        aggregate_cringe_rating: calculateBaseCringeRating(extended_tv_data),
                        first_air_date: new Date(show.firstAired),
                        last_air_date: new Date(show.lastAired),
                        series_status: extended_tv_data.status.name,
                        poster_link: poster,
                        genres: {
                            connectOrCreate: genres.map((genre: Genre) => ({
                                where: { genre_id: genre.genre_id },
                                create: {
                                    genre_id: genre.genre_id,
                                    genre_name: genre.genre_name,
                                },
                            })),
                        },
                        content_ratings: {
                            connectOrCreate: extended_tv_data.contentRatings.map((cr: ContentRating) => ({
                                where: { content_rating_id: cr.content_rating_id },
                                create: {
                                    content_rating_id: cr.content_rating_id,
                                    content_rating: cr.content_rating,
                                    rating_country: cr.rating_country,
                                    content_rating_description: cr.content_rating_description ?? "No description available",
                                }
                            })),
                        },

                        original_country: show.originalCountry ?? "Unknown",

                    }
                })
            }
        } catch (error) {
            console.error(`Error seeding show with ID ${show.id}`, error);
        }
    }
    console.log('Seeding Done!' + tv_data_from_tmdb.length);
}


main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });