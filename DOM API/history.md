# History API란?
- DOM의 Window객체의 history 객체를 통해 브라우저의 세션기록에 접근할수있는 방법을 제공
 - 세션기록이란?
- history를 통해 사용자를 자신의 방문기록 앞과 뒤로 보내고 기록 스택의 콘텐츠도 조작 할수있는 유용한메소드와 속성을 가짐
- 스택처럼 동작

## history.back
- 사용자가 브라우저 도구 모음의 뒤로가기 버튼을 누른것과 동일

## history.forward
- 사용자가 브라우저 도구 모음의 앞으로가기 버튼을 누른것과 동일

## history.go
- 세션기록을 통해 현재페이지의 위치를 기준으로 상대적인 거리에 위치한 특정지점까지 이동가능
- history.go(-1) 뒤로가기 , history.go(1) 앞으로가기 ,go(0) 현재페이지 불러오기

## history.length
- 세션 기록 스택의 크기를 알아낼수있음

## history.pushState
- 페이지를 갱신시키지 않고 페이지 주소만 변경함
- history.pushState(state,title,url)이 들어간다
  - 첫번째 인자 : state는 새로운 세션 기록 항목에 연결할 상태 객체 , (새로운 상태로 이동할떄마다 이벤트 객체에 state에 해당하는 복제본이 담겨있음), history.state로 접근가능

  - 두번째 인자 : title => 대부분의 브라우저가 무시하지만 , 상태에대한 짧은제목을 지정
  - 세번째 인자 : url (option) 새로운 세션 기록 항목의 URL이다. 상대경로(현재url기준), 절대경로 지정가능, 
    - 쉽게 말하면 변경할 주소

- 세션기록에 새로운 주소를 추가하여 방금까지 있던 주소를 이전주소로 두고 새로운주소로 이동함 
  - 이러한 이유로 뒤로가기 버튼 활성화

- 이전 URL과 신규 URL의 해시가 다르더라도 절대 hashchange 이벤트를 발생시키지않음


## history.pushState url 속성 예시
~~~js

//절대경로로 처리 
// 현재 위치가 localhost:8080/book/ 일경우
history.pushState(null,"",'/pushpush')  // localhost:8080/pushpush
history.pushState(null,"",'pushpush')  // localhost:8080/pushpush


// 상대경로로 처리
// 현재 위치가 localhost:8080/book/ 일경우
history.pushState(null,"",'./pushpush') // localhost:8080/book/pushpush

~~~


## history.replaceState()
- pushState와 기능은 비슷하나 몇가지 다른점이 존재한다.
- 세션기록 스택의 제일 최근 항목을 주어진 데이터, 지정한 제목 URL로 대체함  (top에 있는것을 대체)
- pushState는 세션기록 스택에 새로운 주소를 추가 , 반면 replaceState는 기존의 세션기록 스택의 제일 최근 항목을 주어진 데이터로 대체
  - replaceState는 첫페이지 일때는 뒤로가기를 할수없음 (기존의 세션기록 스택의 맨위에것을 대체하는것이므로)

## window.onpopstate
- 브라우저의 뒤로가기 버튼이나 hisotry.back 을 통해서 이벤트가 발생함
- event.state에는 현재state가 담겨져있음


# 참고
- https://developer.mozilla.org/ko/docs/Web/API/History



