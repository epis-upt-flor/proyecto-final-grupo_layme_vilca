import Providers from "../../providers";
import ListSportCourt from "./list";

export default function SportCourtsPage(){
    return (
        // @ts-expect-error Server Component
        <Providers>
            <ListSportCourt/>
        </Providers>
    )
}