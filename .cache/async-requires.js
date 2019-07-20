// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  'component---cache-dev-404-page-js': () =>
    import(
      '/Users/calumsieppert/web-projects/ml5js-demo/.cache/dev-404-page.js' /* webpackChunkName: "component---cache-dev-404-page-js" */
    ),
  'component---src-pages-404-js': () =>
    import(
      '/Users/calumsieppert/web-projects/ml5js-demo/src/pages/404.js' /* webpackChunkName: "component---src-pages-404-js" */
    ),
  'component---src-pages-sentiment-jsx': () =>
    import(
      '/Users/calumsieppert/web-projects/ml5js-demo/src/pages/Sentiment.jsx' /* webpackChunkName: "component---src-pages-sentiment-jsx" */
    ),
  'component---src-pages-index-jsx': () =>
    import(
      '/Users/calumsieppert/web-projects/ml5js-demo/src/pages/index.jsx' /* webpackChunkName: "component---src-pages-index-jsx" */
    ),
}
