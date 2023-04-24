import axios from "axios";
import { DtoCreateSportCenter, DtoEditSportCenter, SportCenter, SportCourt ,DtoCreateSportCourt } from "types";

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
    getStoreCenterById : async (sportCenterId : string) : Promise<DtoEditSportCenter> => {
        return await axiosClient.post('/sportcenters/store',{sportCenterId})
    },
    updateStoreCenterById : async(data : DtoEditSportCenter) : Promise<DtoEditSportCenter> => {
        const form = new FormData()
        //@ts-ignore
        Object.keys(data).forEach((key:string) => form.append(key,data[key]))
        return await axiosClient.post('/sportcenters/update',form)
    },
    getSportCourts: async () : Promise<SportCourt[]> => {
        const response = await axiosClient.get('/sportcourts/list')
        return response.data
    },
    storeSportCourt : async (data : DtoCreateSportCourt) : Promise<any> => {
        const form = new FormData()
        //@ts-ignore
        Object.keys(data).forEach((key:string) => form.append(key,data[key]))
        return await axiosClient.post('/sportcourts/store',form)
    },
}
