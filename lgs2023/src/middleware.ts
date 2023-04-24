import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    if(request.nextUrl.pathname.startsWith('/system')){
        const session = await getToken({req : request , secret : 'soygotto'})
        
        if(session){
            
            return NextResponse.next()    
        }else{
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    return NextResponse.next()
  
}