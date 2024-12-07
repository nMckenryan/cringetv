import { ContentRating, Extended_Response } from '../src/types';
import { db } from "~/server/db";
import { type GenreResponse, type TVDB_Extended, type ContentRatingResponse, type Genre, type TVDB_Response, type TVDBShow } from "~/types";



const tvdb_options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TVDB_TOKEN}`,
    },
};

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
                where: { genre_id: g.id },
                update: {},
                create: {
                    genre_id: g.id,
                    genre_name: g.name,
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
                where: { content_rating_id: cr.id },
                update: {},
                create: {
                    content_rating_id: cr.id,
                    content_rating: cr.name,
                    rating_country: cr.country,
                    content_rating_description: cr.description ?? "No description available",
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

    // await seed_genre_and_content_ratings();

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

            if (show !== undefined) {
                await db.televisionShow.upsert({
                    where: { tvdb_id: show.id },
                    update: {},
                    create: {
                        tvdb_id: show.id,
                        name: show.name,
                        description: show.overview,
                        aggregate_cringe_rating: 0.0,
                        first_air_date: new Date(show.firstAired),
                        last_air_date: new Date(show.lastAired),
                        series_status: extended_tv_data.status.name,
                        poster_link: show.image,
                        genres: {
                            connectOrCreate: genres.map((genre: Genre) => ({
                                where: { genre_id: genre.id },
                                create: {
                                    genre_id: genre.id,
                                    genre_name: genre.name,
                                },
                            })),
                        },
                        content_rating: {
                            connectOrCreate: extended_tv_data.contentRatings.map((cr: ContentRating) => ({
                                where: { content_rating_id: cr.id },
                                create: {
                                    content_rating_id: cr.id,
                                    content_rating: cr.name,
                                    rating_country: cr.country,
                                    content_rating_description: cr.description ?? "No description available",
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




