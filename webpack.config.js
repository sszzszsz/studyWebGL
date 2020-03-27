const path = require('path')
// ワイルドカードでファイルを探してきてくれる
const globule = require('globule')

// CSSを別ファイルにするプラグイン
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

// 公開フォルダ・作業フォルダのディレクトリ指定
const dir = {
  src: path.resolve(__dirname, 'src'),
  public: path.resolve(__dirname, 'dist')
}

// development:開発, production:本番
const mode = 'development'

const config = {
  mode: mode,
  entry: path.resolve(__dirname, 'src/js/main.js'), // webpackがビルドを始める際の開始点となるjsファイル
  output: { // bundleファイルをwebpackがどこにどのような名前で出力すればいいのかを指定
    filename: 'main_bundle.js',
    path: dir.public
  },
  module: {
    rules: [
      {
        // ESlint
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|public)/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // jsのコンパイル
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      {
        // scssファイルの設定
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true // ファイルパスの解決
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              root: path.resolve(__dirname, 'src/pug')
            }
          }
        ]
      },
      {
        // 画像を埋め込まず任意のフォルダに保存するF
        test: /\.(gif|png|jpg|jpeg|eot|wof|woff|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img/',
              publicPath: '/assets/img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      // eslint-disable-next-line quotes
      filename: `index.html`,
      template: './src/pug/index.pug',
      title: '',
      data: require('./data.json')
    })
  ]
}

// pugファイルの設定
const documents = globule.find(
  './src/pug/**/*.pug', {
    ignore: [
      './src/pug/**/_*.pug'
    ]
  }
)

documents.forEach((document) => {
  const fileName = document.replace('./src/pug/', '').replace('.pug', '.html')
  console.log('fileName', fileName)
  console.log('document', document)
  const json = require('./data.json')

  Object.keys(json).forEach(function (key) {
    if ('/' + fileName === json[key].path) {
      console.log(json[key].title.replace(/"/g, ''))
      config.plugins.push(
        new HtmlWebpackPlugin({
          filename: `${fileName}`,
          template: document,
          title: json[key].title,
          description: json[key].description,
          pageURL: json[key].path,
          ogpImg: json[key].ogpImg,
          data: json[key]
        })
      )
    }
  })
})

module.exports = config
