import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/buyers', '/sellers'];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // Check for auth token in cookies or headers
        const token = request.cookies.get('auth_token')?.value;

        // If no token, redirect to unauthorized page
        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/unauthorized';
            url.searchParams.set('redirect', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        '/buyers/:path*',
        '/sellers/:path*',
    ],
};
