# NPM

## Node.js 란 무엇인가 ? 
- Chrome V8 Javascript 엔진으로 빌드된 Javascript 프로그래밍 구동환경
- 브라우저 밖에서도 자바스크립트를 실행할수 있게 하는 환경을 제공 해준다 


## Package Manager 란?
- 프로젝트가 의존하는 패키지를 효과적으로 갱신 삭제할수있도록 도와주는 관리도구

## NPM이란 ?
- Node package Manager라고 불리운다.
- 자바스크립트 라이브러리를 설치하고 관리할수있는 패키지 매니저이다.
- Node.js에서 사용할수있는 모듈이다 
- 세계에서 가장 큰 오픈소스 라이브러리 생태계를 가지고있다.
'
## NPM 장점
- 원하는 버전을 자유자제로 쉽게 사용할수있음 (버전 관리가 쉬워짐)
- cdn방식의 단점을 극복  (설치를 쉽게 할수있음 )



## NPM 단점
- 비효율적인 의존성 검색
  - 패키지를 찾지못하면 상위디렉토리를 검색하면서 node_modules 폴더를 계속 찾는다
    - 다른버전의 의존성을 가져올수도있음
    - readdir, stat같은 느린 I/O 호출이 반복됨

- node_modules 폴더의 복잡성 문제
  - 디렉토리가 복잡하여 각 패키지의 내용이 올바른지 확인을 제대로 안함
    - 의존성트리의 유효성만 검증하기 떄문

- node_modules 폴더의 매우 큰 용량 문제


# NPM 명령어

## NPM 초기화 명령어
- npm init, (npm init -y ⇒ 기존 엔터 생략하고 표시해줌)

## NPM 설치 삭제 명령어
- npm install 라이브러리명 (설치)
- npm uninstall 라이브러리명 (삭제)


## NPM 전역(global) 설치 명령어
-  npm install gulp —global
-  /user/local/lib/node_modules 에 설치가된다 (맥북기준)
- 시스템상에서 제공할수 있는 라이브러리들을 사용시 이용됨  (global을 이용해서 설치함)
  - npm i gulp —global

## NPM 지역(local) 설치 명령어
 ### npm i jquery
 - npm install jquery —save와 동일
 - 현재 폴더의 node_modules 안에 지역 설치가 된다
 - package.json에 dependencies 항목에 추가됨 
   - dependencies에는 jquery,vue,recat,angular와 같은 항목을 주로 설치한다.

### npm i jquery -d (dev)
  - npm install jquery —save-dev
  - 현재 폴더의 node_modules 안에 지역 설치가 된다.
  - package.json에 devDependencies 항목에 추가됨 
    - devDependencies에는 webpack,sass,js-compression와 같은 항목을 주로 설치한다.

### npm start
  - package.json 의 scripts에 있는 start명령어를 실행한다.

### npm update
  - 설치된 패키지를 업데이트하는 명령어

### npm run
  - script를 실행하는 명령어
  - script에 build명령어가 존재하면 npm run build를 하면된다.

<hr/>

### 번외
- GitHub Package Registry:  npm, maven, rubygems, NuGet 패키지 및 Docker 이미지를 배포할 수 있는 서비스

<hr/>

### 참고자료 :
    - https://toss.tech/article/node-modules-and-yarn-berry
    - https://www.inflearn.com/course/프런트엔드-웹팩
    - https://dkwjdi.tistory.com/187