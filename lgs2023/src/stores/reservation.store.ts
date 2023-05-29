import { DtoCreateReservation, Reservation, ResponseReservation } from "types"
import { create } from "zustand"

type StoreReservation = {
    isOpenCreateReservation : boolean
    newReservation : DtoCreateReservation &  { sportCourtName  : string }
    toggleCreateReservation : (open : boolean) => void
    setHourReservation : (date : string , hour : number) => void
    setSportCourtId : (sportCourtId : string , total : number , sportCourtName : string) => void
    editReservation : ResponseReservation | null
    isOpenEditReservation : boolean
    setEditReservation:(reservation : ResponseReservation) => void
    closeEditReservation : () => void
}

export const useStoreReservation = create<StoreReservation>((set) => ({
    isOpenCreateReservation : false,
    newReservation : {
        chargeCode : "",
        date : "",
        hourEnd : 0,
        hourStart : 0,
        sportCourtId : "",
        total : 0,
        userId : "",
        sportCourtName : ""
    },
    isOpenEditReservation : false,
    editReservation : null,
    toggleCreateReservation(open : boolean){
        set(state => ({ ...state , isOpenCreateReservation : open }))
    },
    setHourReservation(date,hour) {
        console.log(date)
        set(state => ({...state, newReservation : {...state.newReservation , hourStart : hour , hourEnd : hour + 1 , date }  }))
    },
    setSportCourtId(sportCourtId , total , sportCourtName) {
        set(state => ({...state, newReservation : {...state.newReservation , sportCourtId , total , sportCourtName }  }))
    },
    setEditReservation(reservation){
        set(state => ({...state , editReservation : reservation , isOpenEditReservation : true }))
    },
    closeEditReservation(){
        set(state => ({...state , isOpenEditReservation : false }))
    }
}))