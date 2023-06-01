const babel = require('@rollup/plugin-babel');
module.exports = {
  getBabelConfig() {
    return babel({
      babelrc: false,
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: "node 14.0",
            modules: false
          }
        ]
      ],
      exclude: 'node_modules/**',
      plugins: [
        [
          '@babel/plugin-transform-runtime', 
          {
            corejs: 3
          }
        ]
      ]
    })
  }
}