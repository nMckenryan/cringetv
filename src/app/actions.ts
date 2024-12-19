'use server';
import { api } from "~/trpc/server";
import { type TV_Show } from "~/types";

export async function search(searchTerm: string) {
    let results: TV_Show[] = [];
    try {
        const response = await api.tvShows.searchTVShows(searchTerm);
        if (response.error) {
            console.error(response.error);
        } else {
            results = response.results as TV_Show[];
        }
    } catch (error) {
        console.error("Error searching for TV shows:", error);
    }
    return results;
}