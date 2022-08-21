# 웹팩 데브서버가 필요한 이유?
- 코드가 변경될떄마다 npm run build 를 해야 되는상황이 발생함
  - 웹팩 명령어를 실행하지 않아도 코드만 변경하고 저장하면 웹팩으로 빌드 한 후 브라우저를 새로고침해줌

- 웹팩 빌드 시간 또한 줄여준다.

## 웹팩 데브 서버 사용방법
~~~json
1. npm install -D webpack-dev-server
2. webpack.config.js 파일설정
3. npm run dev로 실행
~~~

## WebPack.config.js 설정
~~~js
var path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports = {
    mode:'none', 
    entry: './HashRouter/App.js',  // 해당 App의 Main js 파일
    output: {
        filename:'bundle.js', //dist에 bundle.js 생성
        path:path.resolve(process.cwd(),'dist')
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
        ]
    },
    // webpack DevServer설정 
    devServer: {
        static: {
            directory: path.join(__dirname, './dist/Component')
        },  ///dist/component를 기본 html경로로 지정 
        open:true, //자동실행
        port: 'auto' // 포트 자동설정 
    },
    plugins: [ // 플러그인
        // 
        new HtmlWebpackPlugin({ template: 'dist/Component/index.html' 
        // template : 경로 기반으로 빌드결과물을 추가해줌 

        // webpack빌드 결과물에 대해 html파일을 만들어주고 그안에 빌드결과물까지 알아서 포함해서 최종적으로 생성된 html파일을 생성됨
 
        
        })
    ]

}
~~~

# 코드 스플리팅 (Code Spliting)
- 애플리케이션이 커지면 번들파일의 크기도 증가하고 브라우저는 자바스크립트의 로딩 및 실행이 끝날떄까지 HTML파싱을 멈춤
  - 이를 해결하기위해 페이지마다 필요한 코드만 로딩 하도록 코드를 잘게 나눈다 (코드 스플리팅) 


# 트리쉐이킹 
- 대부분의 프로젝트에서 외부 모듈이랑 패키지를 사용하는데 외부모듈에 있는 모든 기능을 전부사용할 경우가 없음
  - 사용하지 않는 코드를 빌드과정에서 제거하는 것



