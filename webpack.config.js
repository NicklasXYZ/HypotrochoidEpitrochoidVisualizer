const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        main: "./src/App.ts",
    },
    // Compiled the bundle to directory: "./web/js/main.js"
    output: {
        path: __dirname + "/web/",
        filename: "js/[name].js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        alias: {
            Utils: path.resolve(__dirname, "./src/utils/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                exclude: [/node_modules/, /tsOld/],
                loader: "ts-loader"
            }
        ]
    },
    devServer: {
        host: "0.0.0.0",
        port: 8000,
        publicPath: "/web/",
        disableHostCheck: true
    }
}