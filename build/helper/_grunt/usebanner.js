module.exports = {
  dist: {
    options: {
      position: 'top',
      linebreak: true,
      banner: '<%= banner %>',
    },
    files: [
      {
        cwd: '<%= paths.dist %>/',
        dest: '<%= paths.dist %>/',
        expand: true,
        src: ['*.js'],
      },
    ],
  },
};
