[![tests][tests]][tests-url]
[![coverage][coverage]][coverage-url]
[![maintainability][maintainability]][maintainability-url]

# Randext
A programable, random letter animation effect to display text messages.

## Usage

[![npm][npm]][npm-url]

```console
npm install --save randext
```

### ES Module

```javascript
import Randext from 'randext';

const randext = new Randext({
  element: document.querySelect('[data-randext]'),
});

randrix.start();

```

### UMD Module

```javascript
<script type="text/javascript" src="node_modules/js.randext/dist/randext.min.js"></script>
<script type="text/javascript">
  var randext = new window.Randext.default({
    element: document.querySelect('[data-randext]'),
    interval: 60,
    ignore: '-_,;:./()[]{}<>\'"`#$%&@€!?',
    style: ['small', 'underlined', 'strong'],
    callback: () => {},
  });

  randext.start();
</script>
```

### CSS

```css
[data-randext] {
  display: block;
  margin-bottom: 1em;
  unicode-bidi: embed;
  font-family: inherit;
  font-size: 1em;
  letter-spacing: .064em;
  line-height: 1.875em;
  white-space: pre-line;
  width: 100%;
  color: inherit;
}
```

```css
[data-randext] {
  opacity: 0;
}

[data-randext="true"] {
  opacity: 1;
}

[data-randext-char] {
  display: inline-block;
  width: .65em;
  height: 1.66em;
  font-size: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  line-height: 1.6em;
  vertical-align: middle;
}

[data-randext-char-active="true"] {
  font-weight: bold;
  opacity: 1;
}
```

## Example

### Custom

```javascript
import Randext from 'randext';

const randext = new Randext({
  element: document.querySelect('[data-randext]'),
  interval: 60,
  ignore: '-_,;:./()[]{}<>\'"`#$%&@€!?',
  style: ['small', 'underlined', 'strong'],
  callback: () => {},
});

randrix.start();
```

### Multiple

#### Generator
Generator, yield example. Go to next() with the Randext callback option.

```javascript
import Randext from 'randext';

const elements = document.querySelectorAll('[data-randext]');

function* init(configs) {
  for (let i = 0; i < configs.length; i++) {
    yield emit(configs[i]);
  }
}

function emit(config) {
  config.instance.start();
}

const configs = [];

elements.forEach( (element) => {
  configs.push({
    instance: null,
    settings: {
      element: element,
      callback: () => text.next(),
    },
  });
});

configs.forEach( (config) => {
  config.instance = new Ranext(config.settings);
  config.instance.init();
});

const text = init(configs);
text.next();
```

## Documentation

* [Example](https://exiguus.github.io/js.randext/)
* [jsDoc](https://exiguus.github.io/js.randext/jsdoc/)
* [Coverage](https://exiguus.github.io/js.randext/jsdoc/coverage/)


[tests]: https://img.shields.io/travis/exiguus/js.randext/master.svg
[tests-url]: https://travis-ci.org/exiguus/js.randext

[maintainability]:
https://api.codeclimate.com/v1/badges/192506e0ccb2e5f72435/maintainability
[maintainability-url]:
https://codeclimate.com/github/exiguus/js.randext/maintainability

[coverage]:
https://api.codeclimate.com/v1/badges/192506e0ccb2e5f72435/test_coverage
[coverage-url]:
https://codeclimate.com/github/exiguus/js.randext/test_coverage

[npm]: https://img.shields.io/npm/v/randext.svg
[npm-url]: https://npmjs.com/package/randext
