module.exports = {
  options: {
    start_comment: '/* start: development-code */',
    end_comment: '/* end: development-code */',
  },
  dist: {
    src: ['<%= paths.dist %>/*.js'],
  },
};
