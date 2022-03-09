module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.txt$/i,
      use: 'raw-loader'
    }),
    config.module.rules.push({
      test: /\.ipynb$/,
      use: 'ipynb?cellsOnly=true'
    })
    return config
  },
}
