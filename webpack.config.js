const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {

        plugins: [
            new webpack.DefinePlugin(envKeys),
            new webpack.LoaderOptionsPlugin({
                options: {
                    configureWebpack: {
                        devServer: {
                            https: true,
                            host: '127.0.0.1'
                        }
                    },
                }
            })
        ]
    };
};