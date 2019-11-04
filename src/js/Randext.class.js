import Validate from './helper/Validation.class';
import {removeItemsFromArray} from './helper/ArrayHelper.class';

/**
 * @fileOverview Randext Class.
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.2
 * @module {es6} Randext
 */
export default class Randext {
  /**
   * Random letter animation effect to display text messages.
   * @class Randext
   * @classdesc Class to display a Randext.
   * @param {object} options The Randext options.
   * @param {object} options.element The Randext element
   *  to display with innerText.
   * @param {number} options.interval The Randext interval to display.
   *  Default is 100.
   * @param {string} options.ignore The Randext Chars not to display.
   * Default is '-_,;:./()[]{}<>\\\'"`#$%&@€!?'.
   * @param {array} options.style The Randext random Char styles to display.
   *  Default is undefined.
   * @param {function} options.callback The Randext callback to
   *  run after stop. Default is null.
   */
  constructor(options) {
    this._defaults = {
      element: {},
      interval: 50,
      ignore: '-_,;:./()[]{}<>\\\'"`#$%&@€!?',
      style: undefined,
      callback: null,
    };
    this._options = Validate.options(options);
    if (this._options.error) return this.throwError();
    this._options = options;
    // ES2018 this._settings = {...this._defaults, ...this._options};
    this._settings = Object.assign({}, this._defaults, this._options);
    this._message = this._settings.element.innerText.split('');
    this._possible = [...new Set(this._message)].sort().join('');
    this._ignore = [...new Set(this._settings.ignore.split(''))];
    this._possibleIgnore = removeItemsFromArray(
      this._possible.split(''),
      this._ignore
    ).sort().join('');
    this._element = this._settings.element;
    this._width = this._message.length;
    this._height = 1;
    this._interval = this._settings.interval;
    this._possibleLength = this._possible.length;
    this._style = this._settings.style;
    this._styleLength = (this._style) ? this._style.length : 0;
    this._styleEnable = this._styleLength > 0;
    this._index = 0;
    this._matrix = [];
    this._x = 0;
    this._random = 1;
    this._callback = this._settings.callback;
    this._calledback = false;
    this._run = false;
    this._init = false;
    this._start = false;
  }

  /**
   * Throw Errors if Randext has invalid options.
   * @function Randext.throwErrors
   */
  throwError() {
    throw new Error(this._options.error);
  }

  /**
   * Is there a callback and not executed yet?
   * @function Randext.isCallback
   * @return {boolean} is there a callback or not and is it executed or not.
   */
  isCallback() {
    return typeof this._callback === 'function' && this._calledback === false;
  }

  /**
   * Random Char from Possible Chars
   * @function Randext.char
   * @param {boolean} next matrix item request.
   * @return {string} the Char.
   */
  char(next) {
    // TODO: put this in method -> move to char object to store
    const possible = (!next) ? this._possibleIgnore :
      this._possible + this._message[this._x + 1].repeat(
        Math.floor(this._possibleLength * this._random)
      );
    return possible.charAt(
      Math.floor(
        Math.random() * possible.length
      )
    );
  }

  /**
   * Style the Char from Possible Styles
   * @function Randext.charStyle
   * @return {string} the Char Style.
   */
  charStyle() {
    return (this._style) ? this._style[
      Math.floor(Math.random() * this._styleLength)
    ] : '';
  }

  /**
   * Create a Char on the Randext
   * @function Randext.charCreate
   * @param {number} x position of the Char.
   * @return {boolean} is the Char created.
   */
  charCreate(x) {
    const id = `x${x}`;
    this._matrix[id] = {
      element: this.charCreateElement(id) || {},
      x: x,
    };
    return true;
  }

  /**
   * Init a Char on the Randext
   * @function Randext.charInit
   * @param {number} x position of the Char.
   * @return {boolean} is the Char created.
   */
  charInit(x) {
    const id = `x${x}`;
    this._matrix[id].interval = this.charStart(id) || (() => false);
    this._run = true;
    return true;
  }

  /**
   * Create the Char Element on the Randext
   * @function Randext.charCreateElement
   * @param {object} id of the Char.
   * @return {object} element of the Char.
   */
  charCreateElement(id) {
    const char = this.char(false, id);
    const element = document.createElement('span');
    const text = document.createTextNode(char);

    element.appendChild(text);
    element.setAttribute('data-randext-char', id);

    if (this._styleEnable && this.charStyle()) {
      element.setAttribute('data-randext-style', this.charStyle());
    }
    this._element.appendChild(element);

    return element;
  }

  /**
   * Char is the Last Child on the Randext
   * @function Randext.charIsLastChild
   * @param {string} id of the Char.
   * @return {boolean} Char is the last child or not.
   */
  charIsLastChild(id) {
    return this._x === this._width - 1;
  }

  /**
   * Update the Char on the Randext
   * @function Randext.charUpdate
   * @param {string} id of the Char.
   */
  charUpdate(id) {
    if (this._matrix[id]) {
      const current = this._matrix[id].x === this._x + 1;
      const char = this.char(current);

      this.charUpdateElement(id, char);
      this.charUpdateStatus(id, char);
    }
  }

  /**
   * Update the Char on the Randext
   * @function Randext.charUpdateElement
   * @param {string} id of the Char.
   * @param {string} char to update.
   */
  charUpdateElement(id, char) {
    if (this._matrix[id] && this._matrix[id].element) {
      if (this._styleEnable) {
        this._matrix[id].element
          .setAttribute('data-randext-style', this.charStyle());
      }
      this._matrix[id].element.innerHTML = char;
    }
  }

  /**
   * Update the Char on the Randext
   * @function Randext.charUpdateStatus
   * @param {string} id of the Char.
   * @param {string} char to update.
   */
  charUpdateStatus(id, char) {
    (this.charIsLastChild()) ? this.reset():
      (!this.charMatch(id, char)) || this.charActivate(id);
    if (this._message.length === this._index) {
      this.charStop(id);
      if (this.isCallback()) this._calledback = true && this._callback();
    }
  }

  /**
   * Match the Char on the Randext
   * @function Randext.charMatch
   * @param {object} id of the Char.
   * @param {string} char to match.
   * @return {boolean} char has matched or not.
   */
  charMatch(id, char) {
    if (this.charMatchIndex(char) && this.charMatchPosition(id)) {
      if (this._debug) {
        // eslint-disable-next-line no-console
        console.log(
          'next', 'x' + this._x, 'c' + char
        );
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Match the Char Position on the Randext
   * @function Randext.charMatchIndex
   * @param {string} char to match.
   * @return {boolean} char has index matched or not.
   */
  charMatchIndex(char) {
    return this._message[this._index] === char;
  }

  /**
   * Match the Char Position on the Randext
   * @function Randext.charMatchPosition
   * @param {object} id of the Char.
   * @return {boolean} char has position matched or not.
   */
  charMatchPosition(id) {
    return (this._matrix[id]) ?
       // first char
      (this._index === 0 && this._x === this._matrix[id].x) ||
      // forward in the current line if not first char
      (this._index !== 0 && this._x + 1 === this._matrix[id].x) :
    false;
  }

  /**
   * Activate the Char on the Randext
   * @function Randext.charActivate
   * @param {string} id of the Char.
   * @return {boolean} is the Char successful activated.
   */
  charActivate(id) {
    if (this._matrix[id]) {
      this._index = this._index + 1;
      this._x = this._matrix[id].x;
      this.charStop(id);
      this._matrix[id].element
        .setAttribute('data-randext-char-active', 'true');
      return true;
    } else {
      return false;
    }
  }

  /**
   * Stop the Char on the Randext
   * @function Randext.charStop
   * @param {string} id of the Char.
   * @return {function} clearInterval function of the Char.
   */
  charStop(id) {
    return (this._matrix[id]) ? clearInterval(this._matrix[id].interval) :
      () => false;
  }

  /**
   * Start the Char on the Randext
   * @function Randext.charStart
   * @param {string} id of the Char.
   * @return {function} setInterval function of the Char.
   */
  charStart(id) {
    return setInterval(() => {
      this.charUpdate(id);
    }, Math.floor(Math.random() * this._interval) * 2);
  }

  /**
   * Create the Randext
   * @function Randext.create
   * @param {boolean} init Char.
   * @return {boolean} done.
   */
  create(init) {
    for (let x = 0; x < this._width; x++) {
      (init) ? this.charInit(x) : this.charCreate(x);
    }
    return true;
  }

  /**
   * Reset the Randext
   * @function Randext.reset
   * @param {boolean} init Char.
   * @return {boolean} done.
   */
  reset(init) {
    this._element.innerHTML = '';
    this.stop(
      () => {
        this.constructor(this._settings);
        (init) ? this.init() : this.start();
      }
    );
    return true;
  }

  /**
   * Stop the Randext
   * @function Randext.stop
   * @param {function} callback to execute.
   * @return {boolean} done.
   */
  stop(callback) {
    for (const item in this._matrix) {
      if (this._matrix.hasOwnProperty(item)) {
        if (this._matrix[item].interval) {
          clearInterval(this._matrix[item].interval);
        }
      }
    }
    if (typeof callback === 'function') callback();
    return true;
  }

  /**
   * Start the Randext
   * @function Randext.start
   * @return {boolean} done.
   */
  start() {
    if (!this._init) this.init();
    (this._index === 0 && !this._run) ? this.create(true) : this.reset(true);
    return true;
  }

  /**
   * Start the Randext
   * @function Randext.init
   * @return {boolean} done.
   */
  init() {
    this._element.innerText = '';
    (this._index === 0 && !this._run) ? this.create() : this.reset();
    this._element.setAttribute('data-randext', 'true');
    this._init = true;
    return true;
  }
}
