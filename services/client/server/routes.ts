const next_routes = require( 'next-routes' );

// Setup router.
module.exports = next_routes()
  .add( 'index', '/' )
  .add( 'PostsWithClassComponent' )
  .add( 'PostsWithFunctionComponent' )
  .add( 'single', '/posts/:slug' );