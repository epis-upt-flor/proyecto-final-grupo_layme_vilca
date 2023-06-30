import { api } from "@/api";
import { useStoreReservation } from "@/stores/reservation.store";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { SportCourt } from "types";

export default function ChooseSportCourt(){

    const { setSportCourtId , newReservation  } = useStoreReservation()
    const {data : sportcourts , isLoading } = useQuery<SportCourt[]>({
        queryKey : ['/api/sportcourts/me'],
        queryFn : api.getMySportCourts,
        initialData : []
    })

    return (<>
        <Stack gap={2}>
            {
                sportcourts.map( sp => (<Grid key={sp.id} item xs={6}>
                    <Card raised={true} sx={{ backgroundColor : (t) => newReservation.sportCourtId == sp.id ? "rgba(25, 118, 210,0.2)" : "white"  }}  onClick={() => setSportCourtId(sp.id , sp.price * 1 , sp.name )}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {sp.name}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                S/. {sp.price}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>))
            }
        </Stack>    
    </>)
}