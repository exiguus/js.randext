const path = require('path');

const express = require('express');
const app = express();
const isDev = app.get('env') === 'development';

const expressNunjucks = require('express-nunjucks');

const compression = require('compression');
const minify = require('express-minify');
const uglifyEs = require('uglify-es');
const minifyHTML = require('express-minify-html');

const favicon = require('serve-favicon');

app.use(compression());
app.use(minify({
  cache: false,
  uglifyJsModule: uglifyEs,
  errorHandler: null,
  cssMatch: /css/,
}));
app.use(function (req, res, next) {
  if (/\.min\.(css|js)$/.test(req.url)) {
    res.minifyOptions = res.minifyOptions || {};
    res.minifyOptions.minify = false;
  }
  next();
});
app.use(minifyHTML({
  override: false,
  exception_url: false,
  htmlMinifier: {
    maxLineLength: 256,
    collapseBooleanAttributes: false,
    collapseWhitespace: false,
    preserveLineBreaks: true,
    decodeEntities: true,
    keepClosingSlash: true,
    sortAttributes: true,
    minifyCSS: true,
    minifyJS: true,
  },
}));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(
  '/static',
  express.static(path.join(__dirname, 'static'))
);
app.use(
  '/static/js/js.randext',
  express.static(path.join(__dirname, '../dist'))
);

app.set('port', process.env.PORT || 3333);

app.set('views', __dirname + '/views');

const njk = expressNunjucks(app, { // eslint-disable-line no-unused-vars
  watch: isDev,
  noCache: isDev,
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(app.get('port'), function () {
  console.log( // eslint-disable-line no-console
    'Server started on port', app.get('port')
  );
});
