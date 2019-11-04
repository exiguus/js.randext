/* globals
  casper
  phantom
  printTestInfo
  getTestCaptureName
*/

/* eslint-disable no-var, no-invalid-this */
var config = {
  'count': 22,
  'url': {
    'origin': 'http://localhost:7357',
    'path': '/src/index.dist.html',
  },
  'path': 'tests/casper/',
  'title': 'Test Randext',
  'viewport': {
    'width': 1600,
    'height': 800,
  },
  'capture': {

    'enable': false,
    'wait': 50,
    'path': 'tests/screenshots/',
    'fileName': 'image',
    'fileEnding': '.png',
  },
  'debug': false,
};
// inject helper
phantom.injectJs(config.path + 'casper.helper.js');

// cli
if (casper.cli.options.path !== undefined) {
  config.url.path = casper.cli.options.path;
}

if (casper.cli.options.origin !== undefined) {
  config.url.origin = casper.cli.options.origin;
}

if (casper.cli.options.capture !== undefined) {
  config.capture.enable = true;
}
// tests

// begin test
casper.test.begin(
  config.title,
  3,
  function suite(test) {
    printTestInfo(
      'Url: ' + config.url.origin + config.url.path
    );

    casper.on('remote.message', function(msg) {
      this.echo('remote message caught: ' + msg);
    });

    // start test
    casper.start(config.url.origin, function() {
      this.viewport(
        config.viewport.width,
        config.viewport.height
      );
    });
    // open path
    casper.thenOpen(config.url.origin + config.url.path, function() {
      if (config.debug === true) console.info(this.getCurrentUrl()); // eslint-disable-line no-console, max-len
    });

    // check elements
    casper.then(function() {
      var element = '[data-randext]';
      printTestInfo(
        'Element: ' + element
      );

      var info = this.getElementInfo(element);
      printTestInfo(
        'Info: ' + JSON.stringify(info)
      );

      // check element exist
      test.assertExists(element, element + ' element exist');
    });


    // check randext
    casper.then(function() {
      var randext = this.evaluate(function() {
        return window.Randext;
      });

      printTestInfo(
        'randext: ' + JSON.stringify(randext)
      );

      // check element exist
      test.assertType(randext, 'object', 'typeof randext is object');
      test.assertType(
        randext.default,
        'object', 'typeof randext.default is object'
      );
    });

    // capture test
    if (config.capture.enable === true) {
      casper.then(function() {
        this.wait(
          config.capture.wait,
          function() {
            this.capture(
              getTestCaptureName(config.capture.fileName), {
                top: 0,
                left: 0,
                width: config.viewport.width,
                height: config.viewport.height,
              }
            );
          }
        );
      });
    }
    // end test
    casper.run(function() {
      test.done();
    });
  }
);
