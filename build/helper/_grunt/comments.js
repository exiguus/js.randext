module.exports = {
  dist: {
    options: {
      singleline: true,
      multiline: true,
      keepSpecialComments: true,
    },
    src: ['<%= paths.dist %>/*.min.js'],
  },
};
