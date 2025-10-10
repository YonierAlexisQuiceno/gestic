// Environment configuration for production mode. This file overrides
// settings found in `environment.ts` when building for production.
// The application will be served over HTTPS by Vercel, and our API calls
// are routed through the same origin using a relative `/api` prefix. The
// rewrite rules defined in `vercel.json` forward these requests to our
// backend running on AWS over HTTP, avoiding mixed content issues.
export const environment = {
  production: true,
  /**
   * Prefix for API calls. During production builds this should remain
   * relative so that requests are sent to the same origin (`https://<your-app>.vercel.app`).
   * Vercel will proxy these requests to the actual backend.
   */
  apiBaseUrl: '/api'
};
