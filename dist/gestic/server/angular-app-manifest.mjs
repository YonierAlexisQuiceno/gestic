
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-I2JC2YA4.js",
      "chunk-YIMKNY4E.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ANJDRGXK.js",
      "chunk-HFZBF6OM.js",
      "chunk-YIMKNY4E.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/service/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-AKZ5LU3Z.js",
      "chunk-YIMKNY4E.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/admin/services"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FMUTAJDB.js",
      "chunk-HFZBF6OM.js",
      "chunk-YIMKNY4E.js"
    ],
    "route": "/admin/requests"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-JW5G445W.js",
      "chunk-HFZBF6OM.js",
      "chunk-YIMKNY4E.js"
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
    'index.csr.html': {size: 26616, hash: 'b38d547a4b1b6e2f483bcb4cec8357be40b82e41dce8f1a255b7a6f129f1a447', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1251, hash: 'ee4b4123ab4c6100fb404d65567eb05949dd203db82b3cc8fc84e1676d774ce0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JY7LC3XP.css': {size: 337929, hash: 'g7EwKYQg/jE', text: () => import('./assets-chunks/styles-JY7LC3XP_css.mjs').then(m => m.default)}
  },
};
