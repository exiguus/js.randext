const webpackProdConfig = require('../../webpack.config.prod');

module.exports = {
    options: {
        stats: process.env.NODE_ENV === 'production',
      },
      prod: webpackProdConfig,
};
