// import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const locales = ['en', 'pt']
const defaultLocale = 'pt'

// async function verifyToken(request: NextRequest) {
//   const token = request.cookies.get('user-info');

//   if (token) {
//     try {
//       const tokenFormat = JSON.parse(token?.value);
//       const tokenAccess = tokenFormat?.token_access;

//       const verifyTokenRequest = await fetch(`${process.env.baseUrlDomain}/token/verify/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token: tokenAccess }),
//       });

//       if (verifyTokenRequest.ok) {
//         return true;
//       }
//     } catch (error) {
//       console.error('Token verification failed:', error);
//     }
//   }

//   return false;
// }

export default async function middleware(request: NextRequest) {
  // First, handle the token verification
  // const isTokenValid = await verifyToken(request);

  // if (!isTokenValid) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // Then, handle internationalization
  const localeMiddleware = createMiddleware({
    locales,
    defaultLocale,
  })

  return localeMiddleware(request)
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*'],
}
