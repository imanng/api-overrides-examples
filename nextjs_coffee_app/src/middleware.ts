import { NextRequest, NextResponse } from "next/server";

const baseAPI = "https://api-overrides.anng.dev/api/proxy/main";

export function middleware(request: NextRequest) {
    // Only handle /api/* routes
    if (request.nextUrl.pathname.startsWith("/api/")) {
        const path = request.nextUrl.pathname.replace("/api", "");
        const searchParams = request.nextUrl.search;
        const targetUrl = `${baseAPI}${path}${searchParams}`;

        // Get client IP from headers (works with Vercel, Cloudflare, etc.)
        const clientIP =
            request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "unknown";

        // Clone the request headers and add forwarding headers
        const headers = new Headers(request.headers);
        headers.set("X-Forwarded-For", clientIP);
        headers.set("X-Real-IP", clientIP);
        headers.set("X-Forwarded-Host", request.headers.get("host") || "");
        headers.set("X-Forwarded-Proto", request.nextUrl.protocol.replace(":", ""));

        // Proxy the request to the target API
        return NextResponse.rewrite(new URL(targetUrl), {
            request: {
                headers,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};
