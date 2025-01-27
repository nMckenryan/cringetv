// pages/api/cron/sync-tvdb.ts
import { type NextApiRequest, type NextApiResponse } from 'next'
import { cut_off_date, getTVDBData } from 'prisma/seed';
import { type TVDB_Response } from '~/types';

// Add this to prevent the API from timing out
export const config = {
    maxDuration: 300 // 5 minutes
}

export const tvdb_options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TVDB_TOKEN}`,
    },
};


export async function syncTVShows() {
    const currentEpoch = () => Math.floor(Date.now() / 1000);

    let tvdb_url = `https://api4.thetvdb.com/v4/updates?since=${currentEpoch()}&type=series&action=update&page=1`;

    const promise = new Promise<number[]>((resolve, reject) => {
        // Initialize an empty array to store show IDs
        const showIds: number[] = [];

        while (tvdb_url !== null) {
            fetch(tvdb_url, tvdb_options)
                .then((response) => response.json() as Promise<TVDB_Response>)
                .then((data) => {
                    for (const show of data.data) {
                        if (show.firstAired != null || new Date(show.firstAired) < cut_off_date) {
                            showIds.push(show.id);
                        }
                    }
                    tvdb_url = data.links.next;
                    console.log("Processed: " + tvdb_url);

                    // If there are no more pages, resolve the promise
                    if (tvdb_url === null) {
                        resolve(showIds);
                    }
                })
                .catch((err) => {
                    console.error("Failed to retrieve data from: " + tvdb_url + "\n" + err);
                    reject(new Error("Failed to retrieve data from: " + tvdb_url + "\n" + err));
                });
        }
    });
    return promise;
}




export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Verify the request is coming from Vercel Cron
    if (req.headers.authorization !== `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
        // Your sync logic here
        // This would be the syncTVShows function we created earlier

        const showIds = await syncTVShows();
        await getTVDBData(showIds);
        return res.status(200).json({ message: 'Sync successful' })
    } catch (error) {
        console.error('Cron job failed:', error)
        return res.status(500).json({ error: 'Sync failed' })
    }
}