# HTTP API 만들기

> 리소스 기준으로 행위로 설계해야한다

예시 :

1. 회원 목록 조회 /members
2. 회원 조회
3. 회원 등록
4. 회원 수정
5. 회원 삭제

> 여기서 리소스는 회원에 해당한다 ,나머지 행위는 동사

## HTTP 메소드 종류

1. GET : 리소스 조회 (쿼리 파라미터와 ,쿼리스트링 통해서 전달)
2. POST : 요청 데이터 처리 , 주로 서버에 등록하는데 사용 (메시지 바디를 통해 서버로 데이터 전달)
3. PUT : 리소스를 완전히 대체함 , 해당 리소스없으면 생성 (덮어씌우기)
   - POST와 다르게 클라이언트가 서버의 리소스를 알고 요청함

4. PATCH : 리소스 부분 변경
   - 부분적으로 보낸 부분만 변경

5. DELETE : 리소스 삭제
6. HEAD : GET과 동일하지만 메시지 부분 제외하고 , 상태줄과 헤더만 반환
7. OPTIONS : 대상 리소스에 대한 통신가능 옵션 (CORS에서 사용)
8. CONNECT,TRACE => 잘 사용 X

## HTTP 메소드 속성

- 안전 : 호출해도 리소스가 변경되지 않는다.
- 멱등 : 여러번 호출해도 결과가 동일함 => POST와 달리 PUT은 멱등함 (기존꺼를 계속 날리고 새로 업데이트함)
  > But 외부 요인으로 리소스가 변경되는건 생각하지 않는다 !

- 캐시가능 : 응답 결과 리소스를 캐시해서 사용해도되는지 (GET,HEAD정도만 캐시로 사용)

## 정적 데이터 조회

- 쿼리파라미터를 사용안함 , 이미지, 정적 텍스트 문서
- 조회는 GET 사용

## 동적 데이터 조회

- 쿼리파라미터를 사용한다. (/search?q=hello&hl=ko)
- 주로 검색 , 게시판 목록에서 정렬 필터 (검색어)
- 조회 조건을 줄여주는 필터 , 조회 결과를 정렬하는 정렬 조건에서 주로 사용

## HTML Form 을 통한 데이터 전송

- HTML Form Submit시 POST 전송
  - 회원가입 , 상품 주문 ,데이터 변경
  - Content-Type:application/x-www-form-urlencoded 사용
    - form 내용을 메시지 바디를 통해서 전송 (key=value ,쿼리 파라미터 형식)
    - 전송 데이터를 url encoding으로 처리

- HTML Form은 GET 전송도 가능 (GET/POST만 지원)
- Content-Type: mulipart/form-data
  - 파일 업로드와 같은 바이너리 데이터 전송시사용
  - 다른 종류의 여러파일과 폼들을 같이 전송가능하다 그래서 mulipart라고 부른다

## HTML API를 통한 데이터 전송

- Content-Type : application/json 형식
- 서버 끼리 통신할때사용
- 앱 클라이언트
- 웹 클라이언트에서 사용 (AJAX로 사용)

## HTML API 설계 예시

- 회원 목록 : /members => GET
- 회원 등록 : /members=> POST
- 회원 조회 : /members/id => GET
- 회원 수정 : /members/id => PATCH,PUT,POST
- 회원 삭제 : /members/id => DELETE

## POST 기반

- 서버에서 리소스 URI를 만들어주고 응답함
  - 클라이언트는 /members -> POST로 요청
  - 서버는 /members/100으로 응답

## PUT 기반

- 클라이언트가 리소스의 URI를 알고 서버에 요청한다.
  - 스토어 기반으로 돌아감
    - 스토어는 클라이언트가 관리하는 리소스 저장소라고 보면된다

# HTML FORM으로 API 설계 하기

1. 회원목록 : /members -> GET
2. 회원등록 폼 : /members/new -> GET
3. 회원 등록 : /members/new, /members -> POST
4. 회원 조회 : /members/id ->GET
5. 회원 수정 폼 : /members/id/edit ->GET
6. 회원 수정 : /members/id/edit , /member/id -> POST
7. 회원 삭제 : /members/id/delete -> POST

> 컨트롤 URI로 동사로 된 리소스 경로를 사용하자 /new , /edit /delete , HTTP 메소드로 해결하기 애매한 경우 사용
