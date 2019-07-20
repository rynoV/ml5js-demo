const { hot } = require('react-hot-loader/root')

// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  'component---cache-dev-404-page-js': hot(
    preferDefault(
      require('/Users/calumsieppert/web-projects/ml5js-demo/.cache/dev-404-page.js')
    )
  ),
  'component---src-pages-404-js': hot(
    preferDefault(
      require('/Users/calumsieppert/web-projects/ml5js-demo/src/pages/404.js')
    )
  ),
  'component---src-pages-sentiment-jsx': hot(
    preferDefault(
      require('/Users/calumsieppert/web-projects/ml5js-demo/src/pages/Sentiment.jsx')
    )
  ),
  'component---src-pages-index-jsx': hot(
    preferDefault(
      require('/Users/calumsieppert/web-projects/ml5js-demo/src/pages/index.jsx')
    )
  ),
}
