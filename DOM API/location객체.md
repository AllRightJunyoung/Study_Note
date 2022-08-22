## Location 객체
- 현재 브라우저에 표시된 HTML 문서 URL 또는 관련정보를 얻거나 브라우저에 새문서를 불러오는데 사용할수있다.
- window 객체의 일부 이고 window.location 속성을 통해 접근가능 (window는 생략이 가능하다.)


## Location 객체 속성
- hash : 주소값에 붙어있는 anchor값 반환 (#test)
- host : URL의 도메인과 포트 반환 (www.example.com:8080)
- href : URL 반환 (http://www.example.com:8080/search?q=devmo#test ,값을대입하여 URL이동가능
- hostname : URL의 도메인 반환 (www.example.com)
- orgin : 프로토콜 + URL의 도메인 + 포트 (http://www.example.com:8080)
- pathName : URL 경로 반환  (/search)
- port : 서버 포트 반환 (8080)
- protocol : 프로토콜 반환 (http:)
- search : URL에 붙은 매개변수 반환(물음표 뒤의 값)  ?q=devmo

## Location 메소드
- assign(url) : 새로운 주소 이동 (location.href로도 가능) 이력은 남기되 다른페이지로 이동 (back가능)
- reload(forceget) : 현재 페이지 새로고침 
- replace(url)  : 새로운 주소 이동(세션 히스토리가 남지 않기 때문에 back버튼으로 이동 불가) 



# 참고 
- https://iamawebdeveloper.tistory.com/41