/**
 * @fileOverview Randext Callback / Generator Example
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.0
 */
import 'babel-polyfill';
import Randext from './js/Randext.class';

const elements = document.querySelectorAll('[data-randext]');

// elements.forEach( (element) => {
//   console.log(element);
//   const randext = new Randext({
//     element: element,
//   });
//   randext.start();
// });

// eslint-disable-next-line require-jsdoc
function* init(configs) {
  for (let i = 0; i < configs.length; i++) {
    yield emit(configs[i]);
  }
}

// eslint-disable-next-line require-jsdoc
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
  config.instance = new Randext(config.settings);
  config.instance.init();
});

const text = init(configs);
text.next();
