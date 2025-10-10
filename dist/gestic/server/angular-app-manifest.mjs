
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-MLF355J4.js",
      "chunk-TC4H74OR.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-L6BMXVGS.js",
      "chunk-HFZBF6OM.js",
      "chunk-TC4H74OR.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/service/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-LQDT6THC.js",
      "chunk-TC4H74OR.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/admin/services"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-LARBVJHF.js",
      "chunk-HFZBF6OM.js",
      "chunk-TC4H74OR.js"
    ],
    "route": "/admin/requests"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-RJNDMNMI.js",
      "chunk-HFZBF6OM.js",
      "chunk-TC4H74OR.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-DPX3DMIO.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/admin/users"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-MZ2RL5RQ.js"
    ],
    "route": "/admin/automations"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-XKDVAGJF.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 0,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 26616, hash: '5f5f412e5442ccb308f9c31b9a114fe6a90977a343460bb9d1d1dad92acb22d1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1251, hash: '77aec32b90191512b522c53155a9ce7da504423864c73545691d5227403bfe7f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JY7LC3XP.css': {size: 337929, hash: 'g7EwKYQg/jE', text: () => import('./assets-chunks/styles-JY7LC3XP_css.mjs').then(m => m.default)}
  },
};
