const UPSTREAM_ORIGIN = "https://space-economy-atlas.vercel.app";
const PROJECT_PATH = "/space-economy";
const PUBLIC_ORIGIN = "https://dandanstop.me";

function isProjectPath(pathname) {
  return pathname === PROJECT_PATH || pathname.startsWith(`${PROJECT_PATH}/`);
}

function buildUpstreamUrl(incomingUrl) {
  return new URL(incomingUrl.pathname + incomingUrl.search, UPSTREAM_ORIGIN);
}

function buildForwardHeaders(request) {
  const forwarded = new Headers();

  for (const key of [
    "accept",
    "accept-language",
    "cache-control",
    "if-modified-since",
    "if-none-match",
    "range",
    "user-agent"
  ]) {
    const value = request.headers.get(key);
    if (value) forwarded.set(key, value);
  }

  forwarded.set("x-forwarded-host", "dandanstop.me");
  forwarded.set("x-forwarded-proto", "https");

  return forwarded;
}

function rewriteRedirectLocation(location) {
  if (!location) return location;

  const upstreamLocation = new URL(location, UPSTREAM_ORIGIN);
  if (upstreamLocation.hostname !== new URL(UPSTREAM_ORIGIN).hostname) {
    return location;
  }

  return `${PUBLIC_ORIGIN}${upstreamLocation.pathname}${upstreamLocation.search}`;
}

async function rewriteHtmlResponse(upstreamResponse, responseHeaders) {
  const html = await upstreamResponse.text();
  const rewrittenHtml = html.includes("<base ")
    ? html
    : html.replace("<head>", '<head>\n    <base href="/space-economy/">');

  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  responseHeaders.delete("etag");

  return new Response(rewrittenHtml, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders
  });
}

export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url);

    if (!isProjectPath(incomingUrl.pathname)) {
      return new Response("Not found", {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-space-economy-proxy": "cloudflare-worker"
        }
      });
    }

    if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          allow: "GET, HEAD, OPTIONS",
          "content-type": "text/plain; charset=utf-8",
          "x-space-economy-proxy": "cloudflare-worker"
        }
      });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          allow: "GET, HEAD, OPTIONS",
          "x-space-economy-proxy": "cloudflare-worker"
        }
      });
    }

    const upstreamUrl = buildUpstreamUrl(incomingUrl);
    const upstreamResponse = await fetch(upstreamUrl.toString(), {
      method: request.method,
      headers: buildForwardHeaders(request),
      redirect: "manual"
    });

    const responseHeaders = new Headers(upstreamResponse.headers);
    responseHeaders.set("x-space-economy-proxy", "cloudflare-worker");

    if (responseHeaders.has("location")) {
      responseHeaders.set(
        "location",
        rewriteRedirectLocation(responseHeaders.get("location"))
      );
    }

    const contentType = responseHeaders.get("content-type") ?? "";
    if (request.method === "GET" && contentType.includes("text/html")) {
      return rewriteHtmlResponse(upstreamResponse, responseHeaders);
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders
    });
  }
};
