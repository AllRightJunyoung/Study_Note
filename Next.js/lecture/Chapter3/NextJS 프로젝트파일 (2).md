# Next JS 프로젝트 생성하기
- npx create-next-app

# 프로젝트 구성요소
1. pages 폴더
- 파일기반의 라우팅 설정가능


2. public 폴더
- 우리페이지가 사용할수있는 공공 리소스가 저장되어있는곳
- NextJS는 내장된 pre-rendering때문에 index.html이 존재 하지 않는다.


3. styles 폴더
- css 스타일 설정

## npm run dev 할시 진행되는과정
1. 개발서버 실행 (Next JS 페이지 및 앱 전반을 담당하는 내장서버)
  > 서버 측 페이지 사전렌더링이 필요하기떄문에 Node.js서버 기반으로 작업
2. 애플리케이션의 배포가 준비 되면 npm run build를 실행하여 프로덕션용으로 구축한다.
