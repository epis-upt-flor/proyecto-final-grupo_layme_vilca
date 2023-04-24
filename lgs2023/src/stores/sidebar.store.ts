import { create } from "zustand"

type StoreSidebar = {
    isOpen : boolean
    expandedGroup : string
    path : string
    setCurrentPage : (path : string) => void
    setExpandedGroup : (title : string) => void
    setToggleSidebar : (open : boolean) => void
}

export const useStoreSidebar = create<StoreSidebar>((set) => ({
    isOpen : false,
    expandedGroup : "",
    path : "",
    setCurrentPage(path : string){
        set(state => ({...state , isOpen : false , path }))
    },
    setExpandedGroup( title : string ){
        set(state => ({...state , expandedGroup :  title }))
    },
    setToggleSidebar(open : boolean){
        set(state => ({ ...state , isOpen : open }))
    }
}))