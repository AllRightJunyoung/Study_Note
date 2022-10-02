# Node js 가 뭘까?
- 브라우저에서는 크롬은 v8 , 사파리의경우 webkit을 사용한다
  - But Node.js를 통해 브라우저에서만 돌아가던 javascript가 서버사이드에서도 실행이 가능해진다
  - Node.js는 구글 크롬엔진인 v8 기반으로 동작하는 서버사이드 런타임이다
    - 이후 npm이라는것이 생겼다 (node package manager)
- Node.js는 Commmon.js 문법 체계를 기반으로 동작한다
- Node.js는 package.json이라는 버전관리 파일 하나로 관리한다
  - package.json에 적힌 모듈은 node_moudles라는 폴더에 생긴다


# NPM과 NPX는 어떤 차이 일까?
- npm install -g를 통해 내 컴퓨터에 글로벌한 공간에 모듈을 설치해 프로젝트마다 같은 모듈을 공유해서 사용할수있는 장점이있다.
  - 단점
    - 모든 프로젝트마다 모듈을 한번 설치한 모듈을 그대로 사용하여 외부 프로젝트 작업시 버전이 안맞는 모듈을 사용할수있다
    - create-react-app을 사용할경우 모듈의 버전이 계속 바뀌는데 충돌이 일어날수가있음

- npx는 위 단점을 극복할수있다
  - npx는 npm모듈을 로컬에 설치해야만 실행된던것을 해결한다.
    - why? 매번 npx는 최신버전의 파일을 임시로 불러와 실행 시킨뒤 다시 그 파일은 없어지는 방식으로 돌아간다
  


# 참고
- https://ljh86029926.gitbook.io/coding-apple-react/undefined/node.js-npm
