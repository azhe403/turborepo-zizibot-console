import { NextRequest } from "next/server";
import { getUserInfo } from "@zizibot/rest-client/internal/user-rest";

export function middleware(request: NextRequest) {
  console.log("middleware", request.url);

  getUserInfo().then(r => console.debug('user-info', r));
}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//     '/:path*',
//   ],
// }