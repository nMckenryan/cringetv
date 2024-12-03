
import { create } from 'zustand'
import { type TV_Show } from '~/types'

export type TVStore = {
    tv_data: [],
    loading: boolean,
    error: string
    populate_tv_data: () => void,
    set_loading: () => void,
}


export const useTVStore = create((set) => ({
    tv_data: [] as TV_Show[],
    loading: true,
    error: "",
    // populate_tv_data: (tv: TVDBShow[] | null) => set({ tv_data: tv ?? [] }),
    populate_tv_data: (tv: TV_Show[] | null) => set({ tv_data: tv ?? [] }),
    set_loading: () => set({ loading: false }),
    set_error: (error: string) => set({ error: error }),
}))
