# useReducer

- State를 생성하고 관리할수있는 훅

## 언제 사용할까?

- 여러개의 state값을 다루고 복잡한경우에 사용한다.

## Reducer Dispatch Aciton

철수 : 만원을 출금해주세요 (Dispatch) , Dispatch(action)
은행 : 철수의 요구대로 action에 따라 state를 업데이트해 줌 (Reducer)
계좌 (state) : 철수의 계좌가 업데이트 됨

## useReducer

> useState처럼 컴포넌트가 변경될떄마다 렌더링 해준다.

- reducer를 정의하여 action에 맞는 state값을 변경해줄수있다.

# 코드 예시

```jsx
const ACTION_TYPES = {
  deposit: "deposit",
  withdraw: "withdraw",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.deposit:
      return state + action.payload;

    case ACTION_TYPES.withdraw:
      return state - action.payload;

    default:
      return state;
  }
};
```
