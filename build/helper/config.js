/**
 * Configuration file
 */
let config = module.exports;

config.options = {
  config: {
    // in this directory you can find your grunt config tasks
    src: 'build/helper/_grunt/*.js',
  },
  paths: {
    // helpers folder with tasks
    helper: 'build/helper',
    // dev/working folder
    dev: 'src',
    // dist folder with minified and optimized files
    dist: 'dist',
    // doc folder jsdoc3
    docs: 'docs/jsdoc',
    // src folder
    src: 'src',
    // coverage report
    coverage: 'coverage',
    // static files
    static: 'static',
  },
  name: {
    plugin: 'randext',
  },
  banner: "/* !\n" + // eslint-disable-line quotes
          " * <%= pkg.name %> <%= pkg.version %>\n" + // eslint-disable-line quotes, max-len
          " * <%= pkg.repository.url %>\n" + // eslint-disable-line quotes
          " *\n" + // eslint-disable-line quotes
          " * <%= pkg.author %>\n" + // eslint-disable-line quotes
          " * Released under the <%= pkg.license %> license\n" + // eslint-disable-line quotes, max-len
          " *\n" + // eslint-disable-line quotes
          " * Date: <%= grunt.template.today('yyyy-mm-dd HH:mm:ss') %>\n" + // eslint-disable-line quotes, max-len
          " */", // eslint-disable-line quotes
};
