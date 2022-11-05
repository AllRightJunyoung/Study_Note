# Redux 스타일 가이드

##  우선순위 A (필수적용)
- Mutate한 상태를 만들지 마라 (단 복사본을 수정하는것은 괜찮다)
- 리듀서안에서 비동기 처리를 하면안된다. Ajax calls , timeouts promises (미들웨어에서 처리) => 외부 상태에 영향을 미치게할수있음 , 예측 가능한 형태의 값으로 동작을 할수없게됨
- Non-Serializable Values in State or Actions
  - Promises ,Symbols ,Maps/Sets , fuctions or class 같은것들
    - why ? : 디버깅 , 타임트래블 , store 일관성유지에 방해 

  - redux-thunk나 redux-promise같은 미들웨어는 리듀서 전에 처리해서 예외다
- 어플리케이션당 오직 한개의 리덕스 스토어를 권장한다.


## 우선순위 B (적용하길 권장함)
- RTK를 사용하면 Redux와 함께 사용할필요가없어짐 RTK를 사용하면 논리가 단순해지고 프로그램이 올바른 기본값으로 설정되게 할수있다 , 또한 RTK는 Immer가 내장되어있어 로직을 단순화시키기 쉬움
- RTK의 createSlice API를 사용하는것을 권장함 (기존의 Redux 코드베이스는 복잡함)


- 가능하면 새로운 상태를 계산하기 위한 논리를 디스패치하는 코드가아닌 리듀서에 넣기를 권장한다 
  - 시간여행 , 디버깅 , 실제 앱로직 테스팅에 더쉽고 , 돌연변이와 버그로 이어질수있는 문제를 방지함 => 멘토님께서는 로직이 길어지면 외부에서 처리해도 나쁘지않다고는 말했음

- 리덕스는 하나의 rootState를 가지고 key/value로 나눠진 slice reducer를 가지게되고 slice reducer에서 상태를 업데이트하고 책임을 진다.
  -  blind spreads/return 사용을 최소화하는것을 권장 (...state,...action.payload)
    - dispatched된 액션에 의해 코드가 의존하기떄문에 본래state모양이 변질될우려가 발생하는경우가 있으며 액션이 잘못될경우 버그가발생한다.

- Stored Data에 기반하여 State Slice들을 네이밍해라
  - userRedcer ,post Reducer 같이 이름을 짓지말고 user,post

- Component단위로 State를 설계하지말고 DataType 기반으로 State를 구성해라
  - auth,posts,users, ui (correct) , loginScreen,userList,postList (bad )

- 하나의 큰 useSelector를 호출하는것보다 useSelector를 여러번 호출해서 더적은양의 데이터를 불러오는것을 선호한다. (응집도 고려?)

- typescript를 사용하는것을 추천 

- 디버깅을 위해서 Redux DevTools 플러그인을 사용해라


- Plain Object를 사용해라 









# 참고 
- https://redux.js.org/style-guide/#put-as-much-logic-as-possible-in-reducers

- https://redux.js.org/style-guide/
- https://thewavelet.tistory.com/59 (번역본)