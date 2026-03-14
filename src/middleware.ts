import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const allowed = request.cookies.get("site_access");
  const { pathname } = request.nextUrl;
  const isPublic = process.env.SITE_PUBLIC;

  if (isPublic && isPublic === "true") {
    return NextResponse.next();
  }

  // Permitir acesso à página de construção e assets
  if (
    pathname.startsWith("/em-construcao") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname === "/favicon.png"
  ) {
    return NextResponse.next();
  }

  // Se não tiver cookie, redireciona
  if (!allowed) {
    return NextResponse.redirect(new URL("/em-construcao", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
