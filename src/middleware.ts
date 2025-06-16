import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(JSON.stringify(request.headers));
  // const countryHeader = request.headers.get('X-Country-Code');

  // Block request if header is missing
  // if (!countryHeader || countryHeader === 'Unknown') {
  //   return new NextResponse(`Unauthorized${JSON.stringify(request.headers)}`, {
  //     status: 403,
  //   });
  // }

  // Otherwise, let the request continue
  return NextResponse.next();
}

// Apply this middleware to all routes (except static assets)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};