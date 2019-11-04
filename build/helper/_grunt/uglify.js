module.exports = {
  options: {
    compress: {
      global_defs: {
        'DEBUG': false,
      },
      dead_code: true,
    },
    sourceMap: false,
  },
  dist: {
    files: [
      {
        expand: true,
        cwd: '<%= paths.dist %>',
        src: ['<%= name.plugin %>.js'],
        dest: '<%= paths.dist %>',
      },
    ],
  },
};
