# Babel

## 바벨이란?
- ES6이상의 문법을 지원하지 않는 브라우저에서 동작하게 하기 위해 ES5로 변환시켜주는 트랜스파일러
- JSX,타입스크립트 코드를 하위버전의 자바스크립트 코드로 변환시켜 지원하지 않는 브라우저에서 동작하게 할수있음  

- async await optional nullish coalescing 등 다양한 es2015이상 최신문법들을 변환해줌

- 바벨을 사용하지않는다면 구형브라우저를 위한 코드를 별도로 작성해야함 

## Pollyfil 이란?
- 브라우저에서 지원하지 않는 자바스크립트 코드를 지원 가능하도록 변환한 코드
  - 바벨만 있을경우 ES6+이상 문법을 ES5로 바꿔주지만 ES5에 존재하지않는 Map,Promise,Set들을 Pollyfill을 통해 바꿔줄수있음
    - babel에 탑재된 core-js 라이브러리로 Es6 이후의 문법들을 폴리필 처리할수있음
- Webpack에서 @babel/preset-env을통해 쉽게 Pollyfill 기능 사용가능 


## core-js
- 폴리필을 주입하기 위해 설치되는 라이브러리
- @babel/polyfill의 전역공간 오염 문제와, 바벨 런타임 플러그인의 인스턴스 메소드 문제를 모두 해결


## babel-preset-env
- 이 플러그인을 통해 ES6+이상의 모든기능을 컴파일 할수있음

## babel/cli
- 트랜스 파일을 위한 Babel 명령어들을 포함

## babel/core
- 기존의 코드를 분석하고 변환하는 파싱코드들이 포함

## babel/preset-env
- 프로젝트 환경 설정에 맞게 트랜스 파일에 필요한 플러그인을 결정합니다.


## 웹팩에서 바벨 loader 사용방법
~~~js
1. npm i @babel/core @babel/preset-env babel-loader -D 설치

webpack.config.js 에서 요 부분추가 (바벨로더 셋팅 )
module: {
        rules: [
           {
            test: /\.js$/, //정규식 
            //컴파일할 폴더지정 
            include:[path.resolve(process.cwd(),'dist')], 
            exclude: /node_modules/, //컴파일 제외
            use: {
            loader:'babel-loader',
            options: {
                    "presets": [
                         ["@babel/preset-env",
                            {
                                // 전역스코프 오염방지 usage (사용된기능의 폴리필만 추가시킴)
                            "useBuiltIns": "usage",
                            "corejs": "3",
                        }
                    ]
                    ]
            }
            }
        }
        ]
    }
~~~



- 참고
 - https://tecoble.techcourse.co.kr/post/2021-07-07-babel/