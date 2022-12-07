1. CORS란?

- 서로 다른 출처간에 리소스를 공유할수있도록한다. (백앤드쪽에서 허용할사이트를 지정)

2. CORS 동작원리

1. Orgin Header에 클라이언트 쪽에서 도메인 포트 프로토콜 정보를 붙여서 서버에 보냄
1. 서버는 Access-Control-Allow-Orgin 정보를 클라이언트쪽에 보낸다
1. 브라우저는 서버에서 보낸 Access-Control-Allow-Orgin 정보를 보고 안정한 요청인지확인하고 OK한다.

# 참고

- https://it-eldorado.tistory.com/163
