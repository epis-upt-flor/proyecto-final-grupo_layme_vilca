import { dehydrate, QueryClient } from '@tanstack/query-core';
import { api } from '@/api';
import { ReactQuery } from './ReactQuery';

export default async function Providers({children} : {children : JSX.Element | JSX.Element[] | React.ReactNode}){
      const queryClient = new QueryClient({
        defaultOptions : {
            queries : {
                cacheTime : 1000 * 60 * 60 * 2, // 2 horus
                refetchOnWindowFocus : false
            }
        }
      })
      await queryClient.prefetchQuery(['/api/sportcenters'], api.getSportCenters)

      queryClient.clear()
      return (
        <ReactQuery dehydratedState={dehydrate(queryClient)}>{children}</ReactQuery>
      )
}