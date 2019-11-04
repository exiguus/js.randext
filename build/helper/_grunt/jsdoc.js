module.exports = {
  dist: {
    src: ['src/js/*.js'],
    options: {
      configuration: '../../jsdoc.json',
      destination: '<%= paths.docs %>',
      readme: 'README.md',
    },
  },
};
