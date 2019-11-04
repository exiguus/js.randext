import TestData from './TestData';

/* eslint-disable require-jsdoc */
export default class testHelper {
  static data() {
    return TestData;
  }

  static debug(config, method, value) {
    // eslint-disable-next-line no-console
    return console.log(
      config.name,
      method.name,
      this.escape(value),
      method.expect
    );
  }

  static escape(value) {
    switch (true) {
      case typeof value === 'string':
        return (value.length > 0) ? `'${value}'` : value;
      case typeof value === 'number':
        return value;
      case typeof value === 'object':
        if (Array.isArray(value)) {
          return value.map((item) => {
            this.escape(item);
          }).join(',');
        } else {
          return value;
        }
      default:
        return '';
    }
  }
}
