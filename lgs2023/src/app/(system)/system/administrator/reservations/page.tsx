import Providers from "../../providers";
import ListReservation from "./list";

export default function ReservationPage(){
    return (
        // @ts-expect-error Server Component
        <Providers>
            <ListReservation/>
        </Providers>
    )
}