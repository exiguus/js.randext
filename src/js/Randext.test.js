import 'babel-polyfill';
import TestHelper from './helper/TestHelper.class';
import Randext from './Randext.class';

const data = TestHelper.data();
data.class.configs.forEach((config) => {
  describe(`Randext Class ${config.name}: `, () => {
    let element = {};
    beforeEach(() => {
      element = document.createElement('div');
      element.setAttribute(
        (config.selector) ? config.selector : 'data-randext',
        'false'
      );

      const text = document.createTextNode(
        'Random letter animation effect to display text messages.'
      );
      element.appendChild(text);

      document.body.appendChild(element);

      // add the element to the configuration object
      // of each instance
      // because we do not like to create it every time with in test data
      // TODO: exeption to test no element is given
      if (config.settings && typeof config.settings === 'object') {
        if (!config.settings.element) config.settings.element = element;
      }
    });

    afterEach(() => {
      document.body.removeChild(element);
    });

    if (config.type === 'fail') {
      it('Randext Throw Errors', () => {
        expect(() => {
          new Randext(config.settings);
        }).toThrow(new Error(config.expect));
      });
    } else {
      it('Randext is Object', () => {
        const randext = new Randext(config.settings);
        expect(typeof randext).toBe('object');
      });

      data.methods.forEach((method) => {
        it(`randext.${method.name} is function`, () => {
          // eslint-disable-next-line no-unused-vars
          const randext = new Randext(config.settings);
          expect(eval(`typeof randext.${method.name}`)).toBe(method.type);
        });

        if (method.expect) {
          let value = TestHelper.escape(method.value);
          it(
            `randext.${method.name}(${value}) return ${method.expect}`,
            () => {
              // eslint-disable-next-line no-unused-vars
              const randext = new Randext(config.settings);
              if (method.callBefore) eval(`randext.${method.callBefore}()`);
              if (data.debug) TestHelper.debug(config, method, value);
              expect(
                eval(`typeof randext.${method.name}(value)`)
              ).toBe(method.expect);
              if (method.callAfter) eval(`randext.${method.callAfter}()`);
            });
        }
      });
    }
  });
});
