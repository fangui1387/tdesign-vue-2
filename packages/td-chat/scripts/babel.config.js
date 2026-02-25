module.exports = {
  presets: [['@babel/preset-env', { modules: false }], '@vue/babel-preset-jsx'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};
