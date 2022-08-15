## Virutal DOM을 알아보기전 JSX에 대해 알아보자


# JSX
- 리액트에서 사용하는 문법이다.
- 브라우저에서는 읽을수 없으므로 바벨을 사용해서 일반적인 자바스크립트 코드로 변환시켜야함 
- HTML과 비슷한 형태로 작성이 가능함 



# Virtual DOM 이란?
- Virtual DOM은 HTML DOM의 추상화 버전
- 실제 DOM Object의 속성들은 가지고 있으나 DOM이 가지고있는 API는 가지고있지않음
- 자바스크립트 객체를 활용하고 있음 
   ~~~ js
   
   <ul id="items">
    <li>Item 1</li>
    <li>Item 2</li>
   </ul>
   // 위 태그를 아래와 같이 표현함 
   let domNode={
       tagName:"ul",
       attributes:{id:"items"},
       children:[
           {
               tagName:"li",
               textContent:"Item 1",
           },
           {
           tagName:"li",
           textContent:"Item 2"
           }
       ]
   }

   ~~~
- 메모리상에서 동작하여 훨신빨라짐 (UI의 가상적인 표현을 메모리상에 저장)
- 모든변화를 하나로 묶어서 딱 한번만 실행 시킴 (20개가 변화되도 한번에 묶어서 실행)
  - Dom fragment의 변화를 묶어서 적용한 다음 기존 DOM에 던져줌
  - reflow,repaint 비용을 최소화함




## Virtual Dom의 작동원리
- UI가 변경되면 전체 UI를 Virtual DOM으로 렌더링한다. 
- 현재 Virtual DOM과 이전 Virtual DOM을 비교해 차이를 계산한다 (diffing 알고리즘)
- 변경된부분만 실제 DOM에 반영한다.
- 즉 전체 dom트리가 그려지는것이아님 



# 참고
- https://www.youtube.com/watch?v=PN_WmsgbQCo