import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwt } from './lib/auth';

export async function middleware(request: NextRequest) {
  const cookiesStore = (await cookies()).get('lms_auth_token');

  if (cookiesStore) {
    const payload = jwt.verify(cookiesStore?.value);
    const pathname = request.nextUrl.pathname;

    if (pathname === '/dashboard/admin' && payload?.role !== 'admin') {
      return NextResponse.redirect(new URL(`/dashboard/${payload?.role}`, request.url))
    }

    if (pathname === '/dashboard/instructor' && payload?.role === 'student') {
      return NextResponse.redirect(new URL('/dashboard/student', request.url))
    }

    return NextResponse.next();
  }

  if (!cookiesStore && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}