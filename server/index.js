const path = require('path');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const { createRequestHandler } = require('@remix-run/express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), 'server/build');

const app = express();
app.use(compression());

// You may want to be more aggressive with this caching
app.use(express.static('public', { maxAge: '1h' }));

// Remix fingerprints its assets so we can cache forever
app.use(express.static('public/build', { immutable: true, maxAge: '1y' }));

app.use(morgan('tiny'));
const remixHandler =
  MODE === 'production'
    ? createRequestHandler({ build: require('./build') })
    : (req, res, next) => {
        purgeRequireCache();
        const build = require('./build');
        return createRequestHandler({ build, mode: MODE })(req, res, next);
      };
const proxy = createProxyMiddleware({
  target: 'https://xiphe.net/hannesdiem.de/',
  changeOrigin: true,
});

app.all('*', (req, res, next) => {
  const [path, query] = req.url.split('?');
  if (path === '/' || path === '/assets/css/screen.css') {
    proxy(req, res, next);
  } else if (path.startsWith('/assets/')) {
    res.redirect(301, `https://xiphe.net/hannesdiem.de${req.url}`);
  } else if (!path.match(/\/$/) && !path.match(/\.xml$/)) {
    res.redirect(301, `${path}${query ? `/?${query}` : '/'}`);
  } else {
    const originalEnd = res.end;
    res.end = (...args) => {
      if (res.statusCode === 404) {
        res.end = originalEnd;
        proxy(req, res, next);
      } else {
        originalEnd.apply(res, args);
      }
    };
    remixHandler(req, res, next);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
