export default {
  debug: false,
  class: {
    configs: [{
        name: 'standard',
        settings: {},
      },
      {
        name: 'custom ignore',
        settings: {
          ignore: '-_,;:./()[]{}',
        },
      },
      {
        name: 'custom selector',
        selector: 'data-custom-selector',
        settings: {},
      },
      {
        name: 'custom style',
        settings: {
          style: ['serif', 'sans-serif', 'monospace'],
        },
      },
      {
        name: 'custom interval',
        settings: {
          interval: 200,
        },
      },
      {
        name: 'custom callback',
        settings: {
          callback: () => true,
        },
      },
      {
        name: 'custom',
        selector: 'data-randext-js',
        settings: {
          ignore: '.,-;:_',
          interval: 80,
          style: ['serif', 'sans-serif', 'monospace'],
          callback: () => true,
        },
      },
      {
        type: 'fail',
        name: 'fail settings is number',
        expect: 'options must be an object',
        settings: 7411,
      },
      {
        type: 'fail',
        name: 'fail settings is undefined',
        expect: 'options must be an object',
        settings: undefined,
      },
      {
        type: 'fail',
        name: 'fail interval is object',
        expect: 'options.interval must be a number or undefined',
        settings: {
          interval: [0, 1],
        },
      }, {
        type: 'fail',
        name: 'fail interval is 0',
        expect: 'options.interval must be a number > 0 or undefined',
        settings: {
          interval: 0,
        },
      },
      {
        type: 'fail',
        name: 'fail ignore is number',
        expect: 'options.ignore must be a string or undefined',
        settings: {
          ignore: 1337,
        },
      }, {
        type: 'fail',
        name: 'fail ignore is 0',
        expect: 'options.ignore must be a string > 0 or undefined',
        settings: {
          ignore: ' ',
        },
      },
      {
        type: 'fail',
        name: 'fail style is object and not array',
        expect: 'options.style must be an array or undefined',
        settings: {
          style: {
            first: 'sans-serif',
            second: 'serif',
          },
        },
      },
      {
        type: 'fail',
        name: 'fail style number',
        expect: 'options.style must be an array or undefined',
        settings: {
          style: 42,
        },
      },
      {
        type: 'fail',
        name: 'fail style is empty array',
        expect: 'options.style must be an array > 0',
        settings: {
          style: [],
        },
      },
      {
        type: 'fail',
        name: 'fail callback is string',
        expect: 'options.callback must be a function, null or undefined',
        settings: {
          callback: 'string',
        },
      },
      {
        type: 'fail',
        name: 'fail callback is object',
        expect: 'options.callback must be a function, null or undefined',
        settings: {
          callback: ['string', 101],
        },
      },
    ],
  },
  methods: [
    {
      name: 'start',
      value: '',
      expect: 'boolean',
      type: 'function',
      callBefore: 'init',
      callAfter: 'reset',
    },
    {
      name: 'stop',
      value: '',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
    },
    {
      name: 'stop',
      value: () => true,
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'reset',
    },
    {
      name: 'reset',
      value: '',
      expect: 'boolean',
      type: 'function',
      callBefore: 'init',
    },
    {
      name: 'create',
      value: '',
      expect: 'boolean',
      type: 'function',
    },
    {
      name: 'charStart',
      value: 'x0',
      expect: 'number',
      type: 'function',
      callBefore: 'init',
      callAfter: 'stop',
    },
    {
      name: 'charStop',
      value: 'x0',
      expect: 'function',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charActivate',
      value: 'x0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charMatchPosition',
      value: 'x0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charMatchIndex',
      value: 'x0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charMatch',
      value: 'x0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charUpdateStatus',
      value: ['x0', 'A'],
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charUpdateElement',
      value: ['x0', 'A'],
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charUpdate',
      value: 'x0',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charIsLastChild',
      value: 'x0',
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charCreateElement',
      value: 'x0',
      expect: 'object',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charCreate',
      value: [0, 0],
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'charStyle',
      expect: 'string',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'char',
      expect: 'string',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
    {
      name: 'isCallback',
      value: [0, 0],
      expect: 'boolean',
      type: 'function',
      callBefore: 'start',
      callAfter: 'stop',
    },
  ],
};
