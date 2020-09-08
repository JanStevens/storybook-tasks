module.exports = {
  eslint: {
    configure: {
      rules: {
        'no-unused-vars': [
          1,
          {
            args: 'all',
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  },
  webpack: {
    configure: {
      optimization: {
        runtimeChunk: true,
      },
    },
  }
}