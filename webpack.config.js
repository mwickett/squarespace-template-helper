/**
 *
 * Webpack Config
 * Handles configuration of the Webpack CLI.
 *
 */
var webpack = require( "webpack" );
var path = require( "path" );
var autoprefixer = require( "autoprefixer" );
var sassLoaders = [
    "file-loader?name=../css/[name].css",
    "postcss-loader",
    "sass-loader?sourceMap"
];


/**
 *
 * dev
 * Webpack config for development.
 * Compiles JavaScript & Sass.
 *
 */
dev = {
    devtool: "source-map",


    resolve: {
        root: path.resolve( __dirname ),
        packageMains: [
            "webpack",
            "web",
            "main"
        ]
    },


    entry: {
        "app": path.resolve( __dirname, "source/js/app.js" )
    },


    output: {
        path: path.resolve( __dirname, "template/assets/js" ),
        filename: "[name].js"
    },


    module: {
        preLoaders: [
            // ESLint
            {
                test: /source\/js\/.*\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            }
        ],


        loaders: [
            // Babel
            {
                test: /source\/js\/.*\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: [
                        "es2015"
                    ]
                }
            },

            // Expose
            {
                test: /lib\/jquery\/dist.*\.js$/,
                loader: "expose?$!expose?jQuery"
            },

            // Sass
            {
                test: /\.scss$/,
                loader: sassLoaders.join( "!" )
            }
        ]
    },


    postcss: [
        autoprefixer({
            browsers: [
                "last 2 versions"
            ]
        })
    ],


    sassLoader: {
        includePaths: [
            path.resolve( __dirname, "source/sass" )
        ]
    }
};


/**
 *
 * buildjs
 * Webpack config for JavaScript build.
 * Waits for initial output of JavaScript and runs minification.
 *
 */
buildjs = {
    resolve: {
        root: path.resolve( __dirname ),
    },


    entry: {
        "app": path.resolve( __dirname, "template/assets/js/app.js" )
    },


    output: {
        path: path.resolve( __dirname, "template/assets/js" ),
        filename: "[name].min.js"
    },


    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            },
            mangle: true
        })
    ]
};


module.exports = [
    dev,
    buildjs
];