import axios from "axios";
import { DtoCreateSportCenter, DtoEditSportCenter, SportCenter, SportCourt ,DtoCreateSportCourt, Material, ResponseReservation, DtoCreateReservation, ResponseReservationsBySportCourt, DtoUpdateReservation, NotificationResponse, DtoMarkAsReadNotification } from "types";

export const axiosClient =  axios.create({
  baseURL: "http://localhost:3000/api"
});


export const api = {
    getSportCenters : async () : Promise<SportCenter[]> => {
        const response = await axiosClient.get('/sportcenters/list')
        return response.data
    },
    storeSportCenter : async (data : DtoCreateSportCenter) : Promise<any> => {
        const form = new FormData()
        //@ts-ignore
        Object.keys(data).forEach((key:string) => form.append(key,data[key]))
        return await axiosClient.post('/sportcenters/store',form)
    },
    storeReservation : async (data : DtoCreateReservation) : Promise<any> => {
        return await axiosClient.post('/reservations/store',data)
    },
    getStoreCenterById : async (sportCenterId : string) : Promise<DtoEditSportCenter> => {
        return await axiosClient.post('/sportcenters/store',{sportCenterId})
    },
    updateStoreCenterById : async(data : DtoEditSportCenter) : Promise<DtoEditSportCenter> => {
        const form = new FormData()
        //@ts-ignore
        Object.keys(data).forEach((key:string) => form.append(key,data[key]))
        return await axiosClient.post('/sportcenters/update',form)
    },
    updateReservationPayment : async(data :DtoUpdateReservation) : Promise<any> => {
        return await axiosClient.post('/reservations/payment',data)
    },
    notificationMarkAsRead : async( data : DtoMarkAsReadNotification ) : Promise<any> => {
        return await axiosClient.post('/notifications/markasread',data)
    },

    getSportCourts: async () : Promise<SportCourt[]> => {
        const response = await axiosClient.get('/sportcourts/list')
        return response.data
    },
    getMySportCourts: async () : Promise<SportCourt[]> => {
        const response = await axiosClient.get('/sportcourts/me')
        return response.data
    },
    getMyNotificationsUnreaded: async () : Promise<NotificationResponse[]> => {
        const response = await axiosClient.get('/notifications/unreaded/me')
        return response.data
    },
    getMyNotificationsReaded: async () : Promise<NotificationResponse[]> => {
        const response = await axiosClient.get('/notifications/readed/me')
        return response.data
    },
    getMyReservations: async () : Promise<ResponseReservation[]> => {
        const response = await axiosClient.get('/reservations/me')
        return response.data
    },
    getReservationsBySportCourtId: async (sportCourtId : string) : Promise<ResponseReservationsBySportCourt[]> => {
        const response = await axiosClient.get(`/reservations/sportcourt/${sportCourtId}`)
        return response.data
    },
    storeSportCourt : async (data : DtoCreateSportCourt) : Promise<any> => {
        const form = new FormData()
        //@ts-ignore
        Object.keys(data).forEach((key:string) => form.append(key,data[key]))
        return await axiosClient.post('/sportcourts/store',form)
    },
    getMaterials: async () : Promise<Material[]> => {
        const response = await axiosClient.get('/materials/list')
        return response.data
    },
}
