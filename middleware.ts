import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { UserPayload } from "@rkh-ms/classify-lib";

interface CurrentUser {
    currentUser: UserPayload | undefined;
}

const PUBLIC_ROUTES = ['/auth/login', '/auth/reset-password']

export async function middleware(request: NextRequest) {

    // 1. read the incoming cookie
    const cookie = request.cookies.get('session')

    const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname)

    // 1.1 if cookie is not present
    // and the route is public
    // then continue to the requested page
    if (!cookie && isPublicRoute)
        return NextResponse.next();

    // 1.2 if cookie is not present,
    // and the route is not public
    // then redirect to login
    if (!cookie && !isPublicRoute)
        return NextResponse.redirect(new URL('/auth/login', request.url));

    // 2. if cookie is present then check if it is valid
    try {
        const res = await axios(`${process.env.API_URL}/api/users/currentUser`, {
            method: 'GET',
            headers: {
                'host': process.env.HOST,
                'cookie': `${cookie!.name}=${cookie!.value}`
            }
        })
        const user = res.data as CurrentUser
        if (!user || !user?.currentUser) {
            // if user is not found, redirect to login
            if (!isPublicRoute)
                return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        const encodedUser = encodeURIComponent(JSON.stringify(user.currentUser))

        const reqHeaders = new Headers(request.headers)
        reqHeaders.set('x-user', encodedUser)

        // 3. if cookie is valid then continue to the requested page
        return NextResponse.next({
            request: {
                headers: reqHeaders
            }
        })
    } catch (err) {
        console.error(err);

        if (!isPublicRoute)
            return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|logo.png|_next/image).*)',
        // Match all routes except those starting with _next, api, favicon.ico
        // common static files such as the logo
    ],
}