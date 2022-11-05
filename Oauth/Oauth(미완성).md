# OAuth 2.0 프로토콜

- 인증을 위한 개방형 표준 프로토콜이다
- 소셜 로그인 기능에서 사용하는 프로토콜이다

# OAuth 2.0 용어 정리

1. Authentication : 인증 ,접근 자격이 있는지 검증하는단계
2. Authorization : 인가 자원에 접근할 권할을 부여 , 인가가 완료되면 리소스 접근 권한이 담긴 Access Token이 클라이언트에 부여
3. Access Token : 리소스 서버에게서 리소스 소유자의 보호된 자원을 획들할떄 사용되는 만료기간이 있는 Token
4. Refresh Token : Access Token 만료시 갱신하기 위한 용도로 사용하는 Token

# 구글 Oauth 2.0 동작과정 (권한 부여 승인코드 방식)

1. 사용자는 구글로그인 버튼을 누른다
   - 이떄 web location API로  구글 oAuthURL을 할당함
   - 그러면 구글 로그인창이 뜨고 로그인을한다. (Authorization +Token request)
2. 로그인을 하면 페이지 리다이렉션을 하게되면서 주소창에 토큰 해시값이 생긴다  (Token response)
3. 토큰 해시값을 구글서버에 전송한다. (Google Server로 전송)
4. 구글서버는 사용자로부터온 토큰해쉬값을 검증하고 검증이 되면 유저정보를 클라이언트에 전달해줌

~~~

# 참고

- <https://blog.naver.com/mds_datasecurity/222182943542>
- https://developers.google.com/identity/protocols/oauth2
