import TabsHorizontal, { TabPanelProps } from "@/components/TabsHorizontal";
import DateUtils from '@/utils/date.utils'
import { List, ListItemButton, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { ResponseReservationsBySportCourt } from "types";
import SchedulerHour from "./scheduler.day";




export default function Scheduler({ reservations } : { reservations : ResponseReservationsBySportCourt[]}){

    const today = useMemo( () => DateTime.local(),[])
    const dates = DateUtils.getDatesFromRange(today)
    

    const tabs = dates.map(({date , name },index) => (
        {
            index ,
            title : name ,
            Component : () => <SchedulerHour key={`SH${name}-${date}`} date={String(date)} startHour={6} endHour={22}/>
        })
    )
    return <>
        <TabsHorizontal 
            //@ts-ignore
            tabs={tabs}
        />
    </>
}