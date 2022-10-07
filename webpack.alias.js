const webpack = require('webpack');

module.exports = {
    resolve: {
        alias: {
        '@mui/styled-engine': '@mui/styled-engine-sc'
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        }),
    ],
};