import { headers } from "next/headers";

function firstForwardedIp(value: string | null): string | null {
  const ip = value?.split(",")[0]?.trim();
  return ip || null;
}

async function getRequestClientIp(): Promise<string | null> {
  const requestHeaders = await headers();

  return (
    firstForwardedIp(requestHeaders.get("x-forwarded-for")) ||
    requestHeaders.get("x-real-ip")?.trim() ||
    requestHeaders.get("x-vercel-forwarded-for")?.trim() ||
    null
  );
}

export async function getOverrideForwardingHeaders(): Promise<HeadersInit> {
  const proxySecret = process.env.OVERRIDE_PROXY_SECRET;
  if (!proxySecret) {
    return {};
  }

  const clientIp = await getRequestClientIp();
  if (!clientIp) {
    return {};
  }

  return {
    "x-override-client-ip": clientIp,
    "x-override-proxy-secret": proxySecret,
  };
}
