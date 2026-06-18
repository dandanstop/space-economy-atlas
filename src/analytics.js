export const GA_MEASUREMENT_ID = "G-2CJ15FLWPY";
export const ANALYTICS_PATH = "/space-economy";
export const ANALYTICS_LOCATION = "https://dandanstop.me/space-economy";
export const PROJECT_ANALYTICS_PARAMS = {
  project_slug: "space-economy",
  project_name: "Space Economy"
};

const PRODUCTION_HOSTS = new Set(["dandanstop.me", "www.dandanstop.me"]);
let initialized = false;

function shouldTrack() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return PRODUCTION_HOSTS.has(window.location.hostname) || params.get("analyticsDebug") === "1";
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
}

function loadGtagScript() {
  if (document.querySelector(`script[data-ga4-id="${GA_MEASUREMENT_ID}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.dataset.ga4Id = GA_MEASUREMENT_ID;
  document.head.append(script);
}

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const enabled = shouldTrack();
  window.spaceEconomyAnalytics = {
    enabled,
    measurementId: GA_MEASUREMENT_ID,
    pagePath: ANALYTICS_PATH,
    pageLocation: ANALYTICS_LOCATION,
    project: PROJECT_ANALYTICS_PARAMS
  };

  ensureDataLayer();
  if (!enabled) return;

  loadGtagScript();
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: ANALYTICS_PATH,
    page_location: ANALYTICS_LOCATION,
    page_title: document.title,
    ...PROJECT_ANALYTICS_PARAMS
  });
}

export function trackEvent(eventName, params = {}) {
  if (!initialized) initAnalytics();
  if (!shouldTrack() || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    page_path: ANALYTICS_PATH,
    page_location: ANALYTICS_LOCATION,
    ...PROJECT_ANALYTICS_PARAMS,
    ...params
  });
}
