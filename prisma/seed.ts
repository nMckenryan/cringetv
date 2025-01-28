import { type ContentRatingRaw, type GenreRaw, RatingCode, type Extended_Response } from '../src/types';
import { db } from "~/server/db";
import { type GenreResponse, type TVDB_Extended, type ContentRatingResponse, type TVDB_Response } from "~/types";
import {
    RegExpMatcher,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity';
import { readFileSync, writeFileSync } from 'fs';


export const cut_off_date = new Date("1980-01-01T00:00:00.000Z");

const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
});

export const tvdb_options = {
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

export async function getAdminAccount() {
    try {
        const adminUser = await db.user.findFirst({
            where: {
                name: "admin@cringedb.com",
                email: "admin@cringedb.com",
            },
        });

        if (!adminUser) {
            console.error("Admin user not found");
            return null;
        }
        return adminUser;
    } catch (error) {
        console.error("Error checking for admin account: ", error);
        return null;
    }
}


//TODO: make sure this works when seeding on new DB. makes admin account to use for initial reviews.
export async function createAdminUser() {
    await db.user.create({
        data: {
            email: "admin@cringedb.com",
            name: "admin@cringedb.com",
        }
    })
}


export async function createAdminReview(show: TVDB_Extended, initial_rating: number) {
    try {
        const adminUser = await getAdminAccount();

        if (!adminUser) {
            console.error("Could not add default admin review. Admin user not found");
            return null;
        }

        return await db.review.create({
            data: {
                review_content: "Initial Review, based on content rating, name or year",
                tvdb_id: show.id,
                userId: adminUser.id,
                cringe_score_vote: initial_rating,
                date_created: new Date()
            }
        });
    } catch (error) {
        console.error("Error creating admin review: ", error);

    }
}


export async function getAuthToken() {
    await fetch("https://api4.thetvdb.com/v4/login", tvdb_options)
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
        return RatingCode.BaseUnsafeLimit.valueOf()
    }
    else {
        return null;
    }
}


async function seed_genre_and_content_ratings() {
    const genre: GenreRaw[] = []
    const contentRating: ContentRatingRaw[] = []

    await fetch("https://api4.thetvdb.com/v4/genres", tvdb_options)
        .then((response) => response.json() as Promise<GenreResponse>)
        .then((data) => genre.push(...data.data))
        .catch((err) => console.error("Genres not recieved: " + err))

    // generate Genres
    await fetch("https://api4.thetvdb.com/v4/content/ratings", tvdb_options)
        .then((response) => response.json() as Promise<ContentRatingResponse>)
        .then((data) => contentRating.push
            (...data.data))
        .catch((err) => console.error("Rating not retrieved " + err))

    const start = performance.now();

    //SET GENRES
    for (const g of genre) {
        await db.genre.upsert({
            where: { genre_id: g.id },
            update: {},
            create: {
                genre_id: g.id,
                genre_name: g.name,
            }
        })
    }
    console.log("genre seeded");

    // generate ContentRatings
    for (const cr of contentRating) {
        await db.contentRating.upsert({
            where: { content_rating_id: cr.id },
            update: {

            },
            create: {
                content_rating_id: cr.id,
                content_rating: cr.name,
                rating_country: cr.country,
                content_rating_description: cr.description ?? "No description available",
            }
        })
    }
    console.log("content rating seeded");
    const end = performance.now();
    console.log(`Time taken to retrieve TVDB list: ${(end - start) / 1000} seconds`);
}


export async function getTVDBData(tv_id_list: number[]) {
    const omittedGenreIDs = [4, 7, 8, 16, 21, 23, 36];

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

            if (genres.some(genre => omittedGenreIDs.includes(genre.id)) || extended_tv_data.firstAired === null || extended_tv_data.firstAired === "" || showName === null) {
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
            const cringeRatingBase = calculateBaseCringeRating(extended_tv_data);

            if (cringeRatingBase !== null) {
                await db.televisionShow.upsert({
                    where: { tvdb_id: extended_tv_data.id },
                    update: {},
                    create: upsertData
                });
                await createAdminReview(extended_tv_data, cringeRatingBase);
            } else {
                await db.televisionShow.upsert({
                    where: { tvdb_id: extended_tv_data.id },
                    update: {},
                    create: upsertData

                }
                );
            }
        } catch (error) {
            console.error(`Error seeding show with ID ${id}`, error);
            return null;
        }
    };

    // Process in batches to avoid overwhelming the API
    const BATCH_SIZE = 10;
    for (let i = 0; i < tv_id_list.length; i += BATCH_SIZE) {
        const batch = tv_id_list.slice(i, i + BATCH_SIZE);
        await Promise.allSettled(batch.map(processShow).filter(Boolean));

        // small delay between batches to prevent rate limiting
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
                    if (show.firstAired != null && new Date(show.firstAired) < cut_off_date) {
                        tvdb_list_of_ids.push(show.id);
                    }
                }
                tvdb_url = data.links.next
                console.log("Processed: " + tvdb_url)
            })
            .catch((err) => console.error("Failed to retrieve data from: " + tvdb_url + "\n" + err))
    }
    const end = performance.now();
    console.log(`Time taken to retrieve TVDB list: ${(end - start) / 1000} seconds`);


    writeFileSync('tvdb_list_of_ids.json', JSON.stringify(tvdb_list_of_ids, null, 2));

}

async function main() {
    //PURGE DATABASES
    // await db.$executeRaw`TRUNCATE TABLE "TelevisionShow" CASCADE;`;
    // await db.$executeRaw`TRUNCATE TABLE "Review" CASCADE;`;

    const getAdmin = await getAdminAccount();
    if (getAdmin === null) {
        await createAdminUser();
        console.log("Admin account created!");
    } else {
        console.log("Admin account exists! Skipping creation");
    }

    await seed_genre_and_content_ratings();
    await getListOfShows();
    const tvdb_list_of_ids = JSON.parse(readFileSync('tvdb_list_of_ids.json', 'utf-8')) as number[];

    // const existingIds = await api.tvShows.getAllTVShowIds();
    // const filteredList = tvdb_list_of_ids.filter(id => !existingIds.includes(id));

    await getTVDBData(tvdb_list_of_ids);

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