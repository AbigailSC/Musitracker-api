module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@routes': './src/routes',
          '@controllers': './src/controllers',
          '@utils': './src/utils',
          '@models': './src/models',
          '@services': './src/services',
          '@middlewares': './src/middlewares'
        }
      }
    ]
  ]
};
