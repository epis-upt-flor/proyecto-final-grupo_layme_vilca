import Providers from '../../providers';
import ListSportCenter from './list';

export default async function Page(){
    return (
            // @ts-expect-error Server Component
            <Providers>
                <ListSportCenter/>
            </Providers>
    )
}