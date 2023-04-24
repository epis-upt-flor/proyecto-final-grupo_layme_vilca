import { create } from "zustand"

type StoreSportCenter = {
    isOpenCreateSportCenter : boolean
    toggleCreateSportCenter : (open : boolean) => void
}

export const useStoreSportCenter = create<StoreSportCenter>((set) => ({
    isOpenCreateSportCenter : false,
    toggleCreateSportCenter(open : boolean){
        set(state => ({ ...state , isOpenCreateSportCenter : open }))
    }
}))