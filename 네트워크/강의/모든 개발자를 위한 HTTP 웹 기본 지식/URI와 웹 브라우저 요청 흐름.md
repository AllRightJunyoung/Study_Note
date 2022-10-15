# URI (Uniform Resource Identifier)

- 리소스를 식별하는 통합자
- URL + URN  (Resource Locator + Resource Name)

## URL (Resource Locator)

- foo://example.com:8042/over/there?name=ferret#nose
  - foo = scheme
  - example.com:8042 = authority
  - path = over/there
  - ?name=ferret => query
  - nose = fragment
- 리소스가 있는 위치를 지정

## URN

- 리소스에 이름을 부여
- 이름은 변하지않는다 (urn:isbn:234234234)
- URN은 잘사용되지 않음 (이름만으로 실제 리소스를 찾는방법이 보편화되지않음)

# 보편적인 URL

- scheme://[userinfo@]host[:port][/path][?query][#fragment]
  - <https://www.google.com:443/search?q=hello&hi=ko>

- 프로토콜(https)=> scheme (http,https,ftp)
- userinfo@=> URL에 사용자 정보를 포함해서 인증 (거의 사용x)
- host :호스트명 (www.google.com) , => IP주소도 사용가능
- 포트 번호(443) => 일반적으로 생략 http 80 , https 443,
- 리소스 경로 /path (/search)
- 쿼리파라미터(? q=hello&hl=ko) => ?로 시작 &로 추가가능 웹서버에 제공하는 파라미터
- fragment , html 내부 북마크에서 사용되며 서버에 전송되는 정보는 아님

## 웹 브라우저 요청 흐름

1. 웹 브라우저가 HTTP 메시지 생성
2. 소켓 라이브러리를 통해 전달 (TCP/IP 연결 )
3. TCP/IP 패킷 생성 HTTP메시지에 포함
4. 네트워크 인터페이스 장치를 통해 서버로 전달
