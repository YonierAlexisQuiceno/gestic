import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    // Use server-side rendering for all routes instead of prerendering.
    // Prerendering cannot process parameterised routes like 'service/:id' at
    // build time, leading to errors about missing getPrerenderParams. SSR
    // renders these routes on demand during requests.
    renderMode: RenderMode.Server
  }
];
