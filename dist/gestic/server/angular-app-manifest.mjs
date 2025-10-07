
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-5LTVVQUQ.js",
      "chunk-B2HBJZAC.js",
      "chunk-JZEKDCBV.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Y4C4RSNC.js",
      "chunk-QLLAP4P3.js",
      "chunk-B2HBJZAC.js",
      "chunk-JZEKDCBV.js"
    ],
    "route": "/service/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-DXQLOJ2I.js",
      "chunk-B2HBJZAC.js",
      "chunk-JZEKDCBV.js"
    ],
    "route": "/admin/services"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-YOSOLWSU.js",
      "chunk-QLLAP4P3.js",
      "chunk-B2HBJZAC.js"
    ],
    "route": "/admin/requests"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-C5ZURJCI.js",
      "chunk-JZEKDCBV.js"
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
    'index.csr.html': {size: 5177, hash: '46537c225b40aea3e1faf889d722b951fab506e52594c63958d8c354979b4213', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1149, hash: '59aabf3fe78c842ab968fa9de312eb7a83b1813b60eaeab49fc352a070aef801', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-HR6D4WJL.css': {size: 315730, hash: 'q9j6xvPSaNQ', text: () => import('./assets-chunks/styles-HR6D4WJL_css.mjs').then(m => m.default)}
  },
};
