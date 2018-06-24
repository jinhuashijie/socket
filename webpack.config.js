const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //mode: "development",
    devtool: 'eval-source-map',
	entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
	output: {
	    path: __dirname + "/build",//打包后的文件存放的地方
	    filename: "bundle.js"//打包后输出文件的文件名
	},
	devServer: {   //服务器所在目录为什么不改？改尝试：
	    contentBase: "./build",//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
	},
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })
    ],
}
