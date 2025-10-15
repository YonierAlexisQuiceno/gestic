
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-SUQEUVRE.js",
      "chunk-PXKSTPSR.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-3XOONS5X.js",
      "chunk-2REHWGUS.js",
      "chunk-PXKSTPSR.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/service/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EHGRMWHD.js",
      "chunk-PXKSTPSR.js",
      "chunk-2UPHXI3Y.js"
    ],
    "route": "/admin/services"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-PZK75WKS.js",
      "chunk-2REHWGUS.js",
      "chunk-PXKSTPSR.js"
    ],
    "route": "/admin/requests"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-K5YC23RS.js",
      "chunk-2REHWGUS.js",
      "chunk-PXKSTPSR.js"
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
    'index.csr.html': {size: 26616, hash: '090f37f369755002b33e8f3180c98686b7dd6c740ed7093c54dc901608890676', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1251, hash: 'a45dc1aad4e21d71e7804cb936bbe648df9da7c8459ddcf5650a36692d734f0c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JY7LC3XP.css': {size: 337929, hash: 'g7EwKYQg/jE', text: () => import('./assets-chunks/styles-JY7LC3XP_css.mjs').then(m => m.default)}
  },
};
