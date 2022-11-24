# React 18버전 (2022년 3월 29일 릴리즈함)

## 주요 업데이트
- Batching 작업을 통한 렌더링 퍼포먼스 향상
- Transition을 통해 UI업데이트에 우선순위 부여



## 1. 새로운 Root API의 등장 
> Root는 React가 Render를 위해 트리를 추적하는데 사용하는 최상단에 위치한 데이터 구조의 포인터 <div id="root"></div>
- 18 버전이후에는 새로운 Root API인 ReactDom.createRoot로 React 18버전에서 사용하는 Root를 생성 (ReactDOM from 'react-dom/client')

왜 등장 했을까 ? 
- 18 버전 이전의 React에서는 Root가 되는 컨테이너에 변화가 없더라도 , render 하기위해서는 Root를 반드시 체크하고 통과했어야 했음 (Virtual DOM을 사용하기 떄문에)
  - 하지만 리액트 팀에서는 Root가 되는 컨테이너를 매 렌더링과정마다 체크하며 통과할 필요가없다는것을 알고 있어 , 무의미한 과정을 개선하기위해 적용하게되었다.

## 2. Root API에서의 콜백 함수 삭제
- 18버전 이전에서는 render 함수에 콜백함수를 사용했었으나 , hydration SSR과 함께 콜백함수를 사용하면 해당 콜백함수를 호출하는 타이밍이 
개발자의 예상과는 다르게 매칭이 안될수 있는 상황이 있었기에 매개변수로 받을수있는 콜백함수를 삭제하였음
  > 콜백함수 기능을 활용하려면  requestIdleCallback, setTimeout 혹은 루트에서 ref 콜백을 사용할수있음


## 3. Automatic Batching
> Batching은 더 나은 Rendering 퍼포먼스를 위해서 여러 state 업데이트를 하나의 렌더링 그룹으로 묶음
- 18 버전 출시하기 이전에는  React Event Handler만이 state 업데이트를 Batching 하였다
  - 18 버전 이후로 React Event Handler뿐만 아니라 promise, setTimeout, native event handler 등 다양한 로직에서도 Batching 작업이 가능하게 됨 (createRoot를 통해서 state업데이트의 발생유무를 신경쓰지 않고 자동으로 업데이트들을 배칭시킨다.)

- Batching작업을 통해 Rendering 횟수를 줄일수있게 된다 (여러 State 업데이트를 하나의 렌더링 그룹으로 묶으므로)
- ReactDOM.flusySync()를 사용하면 Batching 하지 않고 업데이트를 진행할수있다.



## 4. Transition
>18버전 이전에는 state를 업데이트하는데 있어 우선순위를 두기 어려워, 우선순위를 두기 위해 디바운스나 스로틀링을 사용하였음 (예상하지않은 delay발생하는 단점)
- Transition특수한 업데이트들을 직접 마킹하면서 의도된 방식으로 작업을 지연 시켜 사용자 UI/UX를 지속적으로 향상시켜줌
  - useTransition Hook을 사용하면 Transition 기능을 쉽게 사용할수있다.


# 참고 
- https://velog.io/@woodong/React-18-%EC%A3%BC%EC%9A%94-%EB%B3%80%EA%B2%BD%EC%A0%90
- https://tech.osci.kr/2022/05/03/react-18v/