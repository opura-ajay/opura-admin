import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('opura_jwt_token')?.value;
  const { pathname } = request.nextUrl;

  console.log('Middleware - Path:', pathname, 'Token exists:', !!token);

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/frontend/sign-in',
    '/frontend/sign-up',
    '/frontend/forgot-password',
    '/frontend/privacy-policy',
    '/frontend/terms-and-conditions',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/privacy-policy',
    '/terms-and-conditions',
    '/backend/api', // Allow backend API routes
    '/api', // Allow Next.js API routes
  ];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'));

  // If it's a public route, allow access
  if (isPublicRoute) {
    console.log('Public route - allowing access');
    return NextResponse.next();
  }

  // For protected routes, check if token exists
  if (!token) {
    console.log('No token - redirecting to sign-in');
    // Redirect to sign-in page
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect', pathname); // Save intended destination
    return NextResponse.redirect(signInUrl);
  }

  // Token exists, allow access
  console.log('Token found - allowing access');
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
