import { create } from "zustand"

type StoreSportCourt = {
    isOpenCreateSportCourt : boolean
    toggleCreateSportCourt : (open : boolean) => void
}

export const useStoreSportCourt = create<StoreSportCourt>((set) => ({
    isOpenCreateSportCourt : false,
    toggleCreateSportCourt(open : boolean){
        set(state => ({ ...state , isOpenCreateSportCourt : open }))
    }
}))