var path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports = {
    mode:'none',
    entry: './dist/App.js',   
    output: {
        filename: 'bundle.js',
        publicPath:'/',
        path:path.resolve(__dirname,'./dist')
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
           {
            test: /\.js$/,
            include:[path.resolve(__dirname,'./dist/App.js')],
            exclude: /node_modules/,
            use: {
            loader:'babel-loader',
            options: {
                    "presets": [
                         ["@babel/preset-env",
                            {
                            "useBuiltIns": "usage",
                            "corejs": "3",
                        }
                    ]
                    ]
            }
            }
        }
        ]
    },
    devServer: {
        static: {
            directory:path.join(__dirname, 'dist'),
        },
        historyApiFallback:true,
        open: true,
        compress: true,
        hot:true,
        port: 'auto'
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './dist/index.html' })
        
    ]
}