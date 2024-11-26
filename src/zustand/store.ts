import { create } from 'zustand'

export type TVDBShow = {
    id: number;
    name: string;
    slug: string;
    image: string;
    nameTranslations: string[];
    overviewTranslations: string[];
    aliases: {
        language: string;
        name: string;
    }[];

    firstAired: string;
    lastAired: string;
    nextAired: string;
    score: number;
    status: {
        id: number | null;
        name: string | null;
        recordType: string;
        keepUpdated: boolean;
    };

    originalCountry: string;
    originalLanguage: string;
    defaultSeasonType: number;
    isOrderRandomized: boolean;
    lastUpdated: string;
    averageRuntime: number;
    episodes: null;
    overview: string;
    year: string;
}

export interface TVDB_Response {
    status: string
    data: TVDBShow[]
    links: {
        prev: string,
        self: string,
        next: string,
        total_items: number,
        page_size: number
    }

}

interface Store {
    tv_data: TVDBShow[]
    populate_tv_data: (newTVData: TVDBShow[]) => void
}

export const useTVStore = create<Store>()((set) => ({
    tv_data: [],
    populate_tv_data: (newTVData: TVDBShow[]) => set(() => ({ tv_data: newTVData })),
}));