!function () {
  // header section
  const configs = [];
  const elements = document.querySelectorAll('[data-randext]');

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

  let i = 0;
  elements.forEach((element) => {
    configs.push({
      instance: null,
      settings: {
        element: element,
        interval: (i < 1) ? 100 : 50,
        ignore: '-_,;:./[]<>\\\'"`#$%&@€!?',
        callback: () => text.next(),
      }
    });
    i++;
  });

  configs.forEach((config) => {
    config.instance = new window.Randext.default(config.settings);
    config.instance.init();
  });

  const text = init(configs);
  setTimeout(() => text.next(), 1000);

  // main section
  // eslint-disable-next-line require-jsdoc
  const initRandextAsync = function(element) {
    const wait = parseInt(element.getAttribute('data-randext-async'));
    const isEndless = element.getAttribute('data-randext-endless');
    const interval = (wait > 90) ? Math.round(wait / 9 * 2) : 120;
    const randext = new window.Randext.default({
      element: element,
      interval: interval,
      ignore: '-_,;:./[]<>\\\'"`#$%&@€!?',
      callback: (isEndless === 'true') ?
        () => setTimeout(() => initRandextAsync(element), 3600) : null,
    });
    randext.init();

    setTimeout(() => {
      randext.start();
    }, wait || 1800);
  };

  const mainElements = document.querySelectorAll('[data-randext-async]');
  mainElements.forEach((element) => {
    initRandextAsync(element);
  });

  // hljs
  const link = document.createElement('link');
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-light.min.css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);
  // eslint-disable-next-line no-undef
  hljs.initHighlightingOnLoad();
}();
