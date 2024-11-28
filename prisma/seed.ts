import { db } from "~/server/db";
import { type GenreResponse, type TVDB_Extended, type ContentRating, type ContentRatingResponse, type Genre, type TVDB_Response, type TVDBShow } from "~/types";



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

    await getGenres(genre);

    await fetch("https://api4.thetvdb.com/v4/content/ratings", tvdb_options)
        .then((response) => response.json() as Promise<ContentRatingResponse>)
        .then((data) => contentRating.push
            (...data.data))
        .catch((err) => console.error(err))

    // generate ContentRatings
    async function setContentRatings(content_rating_list: ContentRating[]) {
        for (const cr of content_rating_list) {
            await db.content_ratings.upsert({
                where: { content_rating_id: cr.content_rating_id },
                update: {},
                create: {
                    content_rating_id: cr.content_rating_id,
                    content_rating: cr.name,
                    rating_country: cr.country,
                    content_rating_description: cr.description ?? "No description available",
                }
            })
        }
    }

    await setContentRatings(contentRating)

}


async function main() {
    const tv_data_from_tmdb: TVDBShow[] = []


    await fetch("https://api4.thetvdb.com/v4/series", tvdb_options)
        .then((response) => response.json() as Promise<TVDB_Response>)
        .then((data) => tv_data_from_tmdb.push(...data.data))
        .catch((err) => console.error(err))



    for (const show of tv_data_from_tmdb) {

        const extended_response = await fetch(`https://api4.thetvdb.com/v4/series/${show.id}/extended?short=true`, tvdb_options);
        if (!extended_response.ok) {
            console.error(`Failed to fetch extended data for show ID ${show.tvdb_id}`);
            continue;
        }
        const res = await extended_response.json() as TVDB_Response;

        const extended_tv_data: TVDB_Extended = res.data;

        // const content_rating: ContentRating[] = extended_tv_data.contentRatings;

        await db.Tv_show.upsert<TVDBShow>({
            where: { tvdbId: show.tvdb_id },
            update: {},
            create: {
                tvdb_id: show.tvdb_id,
                name: show.name,
                description: show.overview,
                content_rating_id: 456,
                content_rating: { connect: extended_tv_data.contentRatings.map((cr: ContentRating) => ({ content_rating_id: cr.content_rating_id })) },
                aggregate_cringe_rating: 0,
                reviews: { connect: { id: 789 } },
                first_air_date: new Date(show.firstAired),
                final_air_date: new Date(show.lastAired),
                series_status: show.status.name,
                poster_link: show.image,
                genre: { connect: extended_tv_data.genres.map((g: Genre) => ({ genre_id: g.id })) },
                original_country: show.originalCountry,
            }
        })
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

