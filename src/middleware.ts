
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.cookies.get('token')) {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/auth/login?ref=checkout', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/checkout',
}