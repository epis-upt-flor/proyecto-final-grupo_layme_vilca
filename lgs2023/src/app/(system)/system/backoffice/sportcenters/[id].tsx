import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"
import { DtoEditSportCenter } from "types"

export default function EditSportCenter({params} : {params : { sportCenterId : string } } ){

    const {data , isLoading} = useQuery<DtoEditSportCenter>(
        ['api/sportcenters',params.sportCenterId],
        async () => await api.getStoreCenterById(params.sportCenterId),
        { enabled : params.sportCenterId ? true : false }
    )

    if(isLoading){
        return <>Cargando SportCenter...</>
    }
    return (<>
        {data}
    </>)
}