var path = require('path');
var webpack = require('webpack');

config = {
    entry: './app/App.js',
    output: {path: __dirname + "/app/dist", filename: 'bundle.js'},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
            "PubSub": "pubsub",
        }),
    ],
};
module.exports = config;