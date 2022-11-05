# MVC 패턴

1. Flux와 Redux가 등장하기전에 통용된 프론트앤드 디자인패턴이다
2. Model에서는 데이터를 관리한다
3. View에서는 Model의 상태를 참조하여 사용자에게 눈에 보이는 형태로 표시 (렌더링)
4. Controller는 사용자로부터 입력을(Aciton) 을 받고  Model을 업데이트하며 Model를 나타내줄 View를 선택
   - View가 Model을 이용하여 업데이트를 할수있고 Model이 View에게 알릴수도있음

# MVC패턴의 단점

- 애플리케이션이 커질수록 애플리케이션의 구조가 매우복잡해진다 (양방향구조)

> why?

1. 하나의 Model이 여러개의 View와 엮여있고 , 한개의 View가 여러 Model과 엮여있어 버그 발생시 탐지하기가 매우힘들어짐

> View와 Model을 애플리케이션이 커질수록 분리하기가 어려워지며 View와 Model간에 의존성이 높다 (양방향)

# Flux 패턴

1. 페이스북의 알림기능에서 에러가 반복되어 MVC패턴에서 예측되지 않는 문제점을 발견하여 사용하게됨
2. Web Application에서 만드는데 사용되는 아키텍처
3. Action -> Dispatcher->store -> View / ->Action->Dispatcher->Store->view (단방향 패턴)

- Dispatcher : 애플리케이션 내의 모든 Action을 받고 Store에게 Action에 따른 state갱신을 명령함
  - Flux패턴에서의 Dispatcher는 오직 하나만 존재

- View : 애플리케이션 UI , store에서 보내준값을 사용자에게 보여줌 , 그리고 action을 발생시킴

- Store : Dispatcher에게 받은 Action에 따라 state를 갱신하고 state를 저장하고있음
  - View에게 store값을 전달

## Flux 패턴장점

> state간에 전이가 사라지며 데이터의 흐름을 단순화시켜 state관리가 쉬워짐

## Flux 패턴과 Redux의 공통점과 차이점

1. 둘다 단방향 데이터 흐름을 가지고있으며 , type에 따라 state를 변경시킴 (공통점)
2. Flux패턴에서의 Store는 여러개 이며 Redux는 하나의 Store 관리 (차이점)
3. Flux패턴의 Dispatcher는 단 한개 , Redux는 Dispatcher가 존재하지않음 (차이점)
4. Flux 패턴은 mutable State ,Redux는 immutable State (차이점)
5. Flux패턴의 store는 state를 갱신과 값을 보관 , Redux의 store는 state를 보관하기만함 => state갱신은 Reducer에서 함

## 참고

- <https://basemenks.tistory.com/284>
- <https://stackoverflow.com/questions/32461229/why-use-redux-over-facebook-flux> 보기
