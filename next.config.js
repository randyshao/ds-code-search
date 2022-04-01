module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.txt$/i,
      use: 'raw-loader'
    }),
    config.module.rules.push({
      test: /\.ipynb$/,
      exclude: /node_modules/,
      use: 'ipynb?cellsOnly=true'
    }),
    config.module.rules.push({
      test: /\.html$/i,
      use: "html-loader",
    })   
    return config
  },
}


// https://github.com/n6g7/ipynb-loader