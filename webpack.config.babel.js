import path from 'path';
import merge from 'webpack-merge';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const dist = path.join(__dirname, 'dist');

const cssLoaders = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: {
        loader: 'css-loader',
        query: {
            modules: true,
            sourceMap: true,
        },
    },
});

const cssPlugin = new ExtractTextPlugin({
    filename: '[name].css',
});

const common = {
    output: {
        path: dist,
        filename: '[name].js',
        chunkFilename: '[id].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader: cssLoaders,
        }, {
            test: /\.pug$/,
            use: "pug-loader"
        }]
    },
    plugins: [
        cssPlugin,
    ]
};

const variation = {};

switch (process.env.VAR) {
    case 'fst' :
        variation.entry = {
            'pages': './config/fst/pages.js',
            'main': './src/pages/main.js',
            'second/second': './src/pages/second/second.js',
        };
        variation.output = {
            libraryTarget: 'umd',
        };
        variation.plugins = [
            new StaticSiteGeneratorPlugin({
                entry: 'pages'
            }),
        ];
        break;
    case 'sec' :
        variation.entry = {
            'main': './config/sec/main.js',
            'second/second': './config/sec/second/second.js',
        };
        variation.output = {
            libraryTarget: 'umd',
        };
        variation.plugins = [
            new HtmlPlugin({
                chunks: ['main'],
                filename: 'main.html',
            }),
            new HtmlPlugin({
                chunks: ['second'],
                filename: 'second/second.html',
            }),
        ];
        break;
}


export default merge(common, variation);
