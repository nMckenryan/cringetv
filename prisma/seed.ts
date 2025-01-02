import { RatingCode, type ContentRating, type Extended_Response } from '../src/types';
import { db } from "~/server/db";
import { type GenreResponse, type TVDB_Extended, type ContentRatingResponse, type Genre, type TVDB_Response } from "~/types";
import {
    RegExpMatcher,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity';
import { readFileSync, writeFileSync } from 'fs';

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

type AuthResponse = {
    status: string
    data: {
        token: string
    }

}

export async function getAuthToken() {
    await fetch("https://api4.thetvdb.com/v4/genres", tvdb_options)
        .then((response) => response.json() as Promise<AuthResponse>)
        .then((data) => tvdb_options.headers.Authorization = `Bearer ${data.data.token}`)
        .catch((err) => console.error("auth token not recieved: " + err))
}
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

    const ratingName = contentRatings.name;
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
        .catch((err) => console.error("Genres not recieved: " + err))

    // generate Genres
    async function setGenres(genre_list: Genre[]) {
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
        .catch((err) => console.error("Rating not retrieved " + err))

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

    const start = performance.now();
    await setGenres(genre);
    console.log("genre seeded");
    await setContentRatings(contentRating)
    console.log("content rating seeded");
    const end = performance.now();
    console.log(`Time taken to retrieve TVDB list: ${(end - start) / 1000} seconds`);
}


async function getTVDBData(tv_id_list: number[]) {
    const omittedGenreName = ["News", "Talk Show", "Children", "Reality"];

    const processShow = async (id: number) => {

        try {
            const extended_response = await fetch(`https://api4.thetvdb.com/v4/series/${id}/extended?short=true`, tvdb_options);
            if (!extended_response.ok) {
                console.error(`Failed to fetch extended data for show ID ${id}`);
                return null;
            }
            const { data: extended_tv_data } = await extended_response.json() as Extended_Response;
            const genres = extended_tv_data.genres;
            const poster = extended_tv_data.image ? extended_tv_data.image : undefined;
            const showName = extended_tv_data.name ?? (extended_tv_data.slug).replace(/-/g, ' ');

            if (genres.some(genre => omittedGenreName.includes(genre.name)) || extended_tv_data.firstAired === null || extended_tv_data.firstAired === "" || showName === null) {
                return null;
            }

            const upsertData = {
                tvdb_id: extended_tv_data.id,
                name: showName,
                description: extended_tv_data.overview,
                aggregate_cringe_rating: calculateBaseCringeRating(extended_tv_data),
                first_air_date: new Date(extended_tv_data.firstAired),
                last_air_date: new Date(extended_tv_data.lastAired),
                series_status: extended_tv_data.status.name,
                poster_link: poster,
                genres: {
                    connectOrCreate: genres.map(genre => ({
                        where: { genre_id: genre.id },
                        create: {
                            genre_id: genre.id,
                            genre_name: genre.name
                        },
                    })),
                },
                content_ratings: {
                    connectOrCreate: extended_tv_data.contentRatings.map(cr => ({
                        where: { content_rating_id: cr.id },
                        create: {
                            content_rating_id: cr.id,
                            content_rating: cr.name,
                            rating_country: cr.country,
                            content_rating_description: cr.description ?? "No description available",
                        }
                    })),
                },
                original_country: extended_tv_data.originalCountry ?? "Unknown",
            };

            return await db.televisionShow.upsert({
                where: { tvdb_id: extended_tv_data.id },
                update: {},
                create: upsertData
            });
        } catch (error) {
            console.error(`Error seeding show with ID ${id}`, error);
            return null;
        }
    };

    // Process in batches to avoid overwhelming the API
    const BATCH_SIZE = 100;
    for (let i = 0; i < tv_id_list.length; i += BATCH_SIZE) {
        const batch = tv_id_list.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(processShow).filter(Boolean));

        // Optional: Add a small delay between batches to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 0));
        console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(tv_id_list.length / BATCH_SIZE)}`);
    }
}
async function getListOfShows() {
    let tvdb_url = "https://api4.thetvdb.com/v4/series?page=1";
    const tvdb_list_of_ids: number[] = [];

    const start = performance.now();
    while (tvdb_url !== null) {
        await fetch(tvdb_url, tvdb_options)
            .then((response) => response.json() as Promise<TVDB_Response>)
            .then(async (data) => {
                for (const show of data.data) {
                    if (show.firstAired != null) {
                        tvdb_list_of_ids.push(show.id);
                    }
                }
                tvdb_url = data.links.next
                console.log(tvdb_url)
            })
            .catch((err) => console.error("Failed to retrieve data from: " + tvdb_url + "\n" + err))
    }
    const end = performance.now();
    console.log(`Time taken to retrieve TVDB list: ${(end - start) / 1000} seconds`);


    writeFileSync('tvdb_list_of_ids.json', JSON.stringify(tvdb_list_of_ids, null, 2));

}

async function main() {

    await seed_genre_and_content_ratings();
    await getListOfShows();
    const tvdb_list_of_ids = JSON.parse(readFileSync('tvdb_list_of_ids.json', 'utf-8')) as number[];

    // const existingIds = await api.tvShows.getAllTVShowIds();

    // const filteredList = tvdb_list_of_ids.filter(id => !existingIds.includes(id));

    const limitedList = tvdb_list_of_ids.slice(0, 300);
    await getTVDBData(limitedList);

    console.log('Seeding Done!');
}


main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error("main error: " + e);
        await db.$disconnect();
        process.exit(1);
    });