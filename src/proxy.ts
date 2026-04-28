import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    console.log(token, 'tokkkkkkkkkken');

    if (token?.token) {
        return NextResponse.next()
    } else {

        return NextResponse.redirect(new URL('/auth/login', request.url))
    }


}

export const config = {
    matcher: ['/cart','/allorders'],
}


