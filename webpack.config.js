module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: __dirname + '/public',
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    context: __dirname,
    module: {
      rules: [
        {
          test: /jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: [
              "@babel/preset-react",
              "@babel/env"
            ]
          }
        },{
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
    devtool: 'source-map'
  }