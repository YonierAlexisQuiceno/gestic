// Environment configuration for development mode. When running the application
// locally with `ng serve` or when building with the development configuration,
// this file provides environment-specific values. For the API base URL we use
// a relative `/api` prefix so that calls from the browser go to the same
// origin as the page. In production this prefix will be proxied by Vercel via
// the `vercel.json` rewrites to point at the actual backend.
export const environment = {
  production: false,
  /**
   * Prefix for API calls. Using a relative path avoids mixed‑content
   * errors when the app is served over HTTPS. In development this
   * can be proxied by the Angular dev server.
   */
  apiBaseUrl: '/api'
};
