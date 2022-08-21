# Babel

## 바벨이란?
- ES6이상의 문법을 지원하지 않는 브라우저에서 동작하게 하기 위해 ES5로 변환시켜주는 트랜스파일러
- JSX,타입스크립트 코드를 하위버전의 자바스크립트 코드로 변환시켜 지원하지 않는 브라우저에서 동작하게 할수있음  

- async await optional nullish coalescing 등 다양한 es2015이상 최신문법들을 변환해줌

- 바벨을 사용하지않는다면 구형브라우저를 위한 코드를 별도로 작성해야함 

## Pollyfil 이란?
- 브라우저에서 지원하지 않는 코드를 사용가능한 코드 조각이나 플러그인을 의미한다.
  - 바벨만 있을경우 ES6+이상 문법을 ES5로 바꿔주지만 ES5에 존재하지않는 Map,Promise,Set들을 Pollyfill을 통해 바꿔줄수있음
  

## babel/cli
- 트랜스 파일을 위한 Babel 명령어들을 포함

## babel/core
- 기존의 코드를 분석하고 변환하는 파싱코드들이 포함

## babel/preset-env
- 프로젝트 환경 설정에 맞게 트랜스 파일에 필요한 플러그인을 결정합니다.


## 웹팩에서 바벨 loader 사용방법
~~~js
1. npm i @babel/core @babel/preset-env babel-loader -D 설치

webpack.config.js 에서 요 부분추가 
module.exports = {
  module: {
    rules: [
      // Babel 파일 로더 설정
      {
        test: /\.m?js$/i,
        exclude: /node_modules/, //node
        use: {
          loader:'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
~~~



- 참고
 - https://tecoble.techcourse.co.kr/post/2021-07-07-babel/