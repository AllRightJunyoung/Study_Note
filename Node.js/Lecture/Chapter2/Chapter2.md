## React
- 클라이언트 사이드 제어
  - UI를 보여줌
- SPA기반 (하나의페이지기반으로 여러요소들을 보여준다)

- Routes (router-dom) , Hooks ,Redux ,CSS

## Node Express
- Server side 제어
- file Storage관리
- REST API OR GraphQL API 기반으로 구축가능

Rest API
- Get ,Post Patch ,Delete등의 조합으로 이용 
- URL을 HTTP 동사로 정의
- GET => 서버로 부터 리소스를 가져옴
- POST => 서버로 데이터를 포스팅  (리소스생성)
- PUT => 리소스 생성 및 재정의
- PATCH => 기존 리소스를 업데이트한다
- DELETE => 리소스를 삭제   

Graph QL API
- 하나의 URL과 하나의 HTTP 동사로 보통 POST요청을 사용해서 구성
- RESTAPI 와 달리 여러엔드포인트가 존재하지않고 하나의 엔드포인트 (/graphql) => POST요청
- 쿼리언어를 알아야함
~~~ text
query { => Operation Type  => (query : 데이터를 가져옴 , 데이터추가 or 변경 mutation , 구독설정시작 subscription) 
    user{ => endpoint
        name => Requested fields 요청하거나 전송하려는 데이터 
    }
}
~~~


> Ajax를 통해 서버사이드와 클라이언트는 HTTP 통신을 주고받는다

## MongoDB
- DataBase Server <- Node/Express에서 주고받음


## Sever Hosts Node API + REACT SPA
- Node Express API로부터 오는 요청들을 다룬다
  - React SPA로 부터 오는 요청은 X
- Node API의 JSON 파일을 response를 다룬다

## Node의 서버 
1. Node Express API로 부터 요청들을 다룸
2. 정적 호스트로부터 전달받음 
3. EJS나 PUG를 사용해서 HTML 페이지를 사용자에게 렌더링 해줌 (비추천 사용자경험에 문제있음 깜빡거림)