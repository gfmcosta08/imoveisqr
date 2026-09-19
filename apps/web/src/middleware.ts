import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const LEGACY_HOSTS = new Set(["imoveisqr.com", "www.imoveisqr.com"]);

export async function middleware(request: NextRequest) {
  if (LEGACY_HOSTS.has(request.nextUrl.hostname.toLowerCase())) {
    return NextResponse.redirect("https://imovflow.com", 308);
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
