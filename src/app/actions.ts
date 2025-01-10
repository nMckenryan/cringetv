'use server';
import { api } from "~/trpc/server";
import { type TV_Show } from "~/types";


export async function getUserById(userId: string) {
    try {
        const user = await api.users.getUserById(userId);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function search(searchTerm: string) {
    let results: TV_Show[] = [];
    try {
        const response = await api.tvShows.searchTVShows(searchTerm);
        if (response.results) {
            results = response.results as TV_Show[];
        } else {
            results = [];
        }

    } catch (error) {
        console.error("Error searching for TV shows:", error);
    }
    return results;
}


export async function getReviewsByUserId(userId: string) {
    try {
        const newReviews = await api.reviews.getReviewsByUserId({
            userId: userId,
        });
        return newReviews;
    } catch (error) {
        console.error("Error getting TV show by ID:", error);
        return null;
    }
}

export async function getReviewsByTVId(tvdb_id: number) {
    try {
        const newReviews = await api.reviews.getReviewsByTVId({ tvdb_id: tvdb_id });
        return newReviews;
    } catch (error) {
        console.error("Error getting TV show by UserID:", error);
        return null;
    }
}