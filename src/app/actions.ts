'use server';
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { type TV_Show } from "~/types";

export async function getSession() {
    try {
        const session = await auth();
        return session;
    } catch (error) {
        console.error("Could not get session", error);
        return null;
    }
}


export async function search(searchTerm: string) {
    let results: TV_Show[] = [];
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    const response = await api.tvShows.searchTVShows(escapedSearchTerm);
    if (response.results) {
        results = response.results as TV_Show[];
    } else {
        results = [];
    }


    return results;
}

export async function getReviewListFromTVID(reviewId: number) {
    try {
        return await api.reviews.getReviewsByTVId({ tvdb_id: reviewId });
    } catch (error) {
        console.error("Failed to fetch reviews", error);
    }
}

export async function getReviewListFromTVIDForReviewListPage(reviewId: number) {
    try {
        return await api.reviews.getReviewListFromTVIDForReviewListPage({ tvdb_id: reviewId });
    } catch (error) {
        console.error("Failed to fetch reviews", error);
    }
}