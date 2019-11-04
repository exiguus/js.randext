/**
 * @fileOverview Validation Class.
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.0
 */
export default class Validation {
  /**
   * Do we have valid options?
   * @function Validation.options
   * @param {options} options to validate.
   * @return {object} options validated.
   */
  static options(options) {
    let error = '';
    switch (true) {
      case (
        typeof options !== 'object'
      ):
        error = 'options must be an object';
        break;
      case (
        typeof options.element !== 'object' ||
        Array.isArray(options)
      ):
        error = 'options.element must be an non-empty object';
        break;
      case (
        typeof options.element.innerText !== 'string'
      ):
        error = 'options.element.innerText must be a string';
        break;
      case (
        typeof options.interval !== 'number' &&
        typeof options.interval !== 'undefined'
      ):
        error = 'options.interval must be a number or undefined';
        break;
      case (typeof options.interval === 'number' && options.interval === 0):
        error = 'options.interval must be a number > 0 or undefined';
        break;
      case (
        typeof options.ignore !== 'string' &&
        typeof options.ignore !== 'undefined'
      ):
        error = 'options.ignore must be a string or undefined';
        break;
      case (
        typeof options.ignore === 'string' &&
        options.ignore.trim().length === 0
      ):
        error = 'options.ignore must be a string > 0 or undefined';
        break;
      case (
        !Array.isArray(options.style) &&
        typeof options.style !== 'undefined'
      ):
        error = 'options.style must be an array or undefined';
        break;
      case (Array.isArray(options.style) && options.style.length === 0):
        error = 'options.style must be an array > 0';
        break;
      case (
        typeof options.callback !== 'function' &&
        options.callback !== null &&
        typeof options.callback !== 'undefined'
      ):
        error = 'options.callback must be a function, null or undefined';
        break;
    }
    return (error.length === 0) ? options : {
      error: error,
    };
  }
}
