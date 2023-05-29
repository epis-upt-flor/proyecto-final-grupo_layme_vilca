import { api } from "@/api";
import { useStoreReservation } from "@/stores/reservation.store";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { SportCourt } from "types";

export default function ChooseSportCourt(){

    const { setSportCourtId } = useStoreReservation()
    const {data : sportcourts , isLoading } = useQuery<SportCourt[]>({
        queryKey : ['/api/sportcourts/me'],
        queryFn : api.getMySportCourts,
        initialData : []
    })

    return (<>
        <Grid container>
            {
                sportcourts.map( sp => (<Grid key={sp.id} item xs={6}>
                    <Card onClick={() => setSportCourtId(sp.id , sp.price * 1 , sp.name )}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {sp.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>))
            }
        </Grid>    
    </>)
}