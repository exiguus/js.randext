module.exports = {
  options: {
    sourceMap: false,
    presets: [
      ['env', {
        'modules': false,
        'targets': {
          'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
      }],
      'stage-2',
    ],
    env: {
      'test': {
        'presets': ['env', 'stage-2'],
      },
    },
  },
  dist: {
    cwd: '<%= paths.dev %>/js/',
    dest: '<%= paths.dist %>/',
    expand: true,
    src: [
      '<%= name.plugin %>.js',
    ],
  },
};
