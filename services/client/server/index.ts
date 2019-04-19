const express = require('express');
const next = require('next');

// Import middleware.
const routes = require( './routes' );

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const handler = routes.getRequestHandler( app );

const proxyMiddleware = require('http-proxy-middleware')
const devProxy = {
  '/api': {
    target: 'http://wordpress/wp-json/',
    pathRewrite: { '^/api': '/' },
    changeOrigin: true
  }
}

app
  .prepare()
  .then(() => {
    //const server = express().use('/api', proxy('http://wordpress/wp-json/wp/v2/'));
    const server = express();

    Object.keys(devProxy).forEach(function (context) {
      server.use(proxyMiddleware(context, devProxy[context]))
    })

    server.use(handler)

    // Fallback handler
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    // Listen on the default port (3000)
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });