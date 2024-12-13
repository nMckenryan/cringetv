
import { create } from 'zustand'
import { type TV_Show } from '~/types'

export type TVStore = {
    searchResult: [],
    loading: boolean,
    error: string
    populate_tv_data: () => void,
    set_loading: () => void,
}


export const useTVStore = create((set) => ({
    searchResult: [],
    loading: true,
    error: "",
    populate_search_result: (tv: TV_Show[] | null) => set({ searchResult: tv ?? [] }),
    set_loading: () => set({ loading: false }),
    set_error: (error: string) => set({ error: error }),
}))
