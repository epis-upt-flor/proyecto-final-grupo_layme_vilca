import { useStoreReservation } from "@/stores/reservation.store"
import { List, ListItemButton, Typography } from "@mui/material"

export default function SchedulerHour({date , startHour,endHour} : {date : string , startHour : number,endHour : number}){
    const { setHourReservation } = useStoreReservation()
    const hours = Array.from(Array(endHour-startHour).keys()).map(h => h + startHour)
    
    return (
        <List>
            {
                hours.map(hour => (
                    <ListItemButton
                        key={`SHH${hour}`}
                        selected={false}
                        onClick={ () => setHourReservation(date,hour)}
                    >
                        <Typography>{hour}H</Typography>
                    </ListItemButton>
                ))
            }
        </List>
    )
}