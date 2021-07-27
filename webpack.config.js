const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

let path = require('path')

module.exports = {
    mode: 'none',

    entry: {
        router: './router.js',
        app: './index.js'
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // output file name
            template: 'index.html'  // template file name
        }),
        new MiniCssExtractPlugin({ filename: 'app.css' }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['public']
        })
    ],

    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.js$/,
                include: path.join(__dirname),
                exclude: /(node_modules)|(public)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },

    devServer: {
        port: 80,
        hot: true
    }
};