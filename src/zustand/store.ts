import { create } from 'zustand'
import { TVDBShow } from '~/types'

export type TVStore = {
    tv_data: [],
    loading: boolean,
    error: string
    populate_tv_data: () => void,
    set_loading: () => void,
}


export const useTVStore = create((set) => ({
    tv_data: [],
    loading: true,
    error: "",
    populate_tv_data: (tv: TVDBShow[] | null) => set({ tv_data: tv ?? [] }),
    set_loading: () => set({ loading: false }),
    set_error: (error: string) => set({ error: error }),
}))
