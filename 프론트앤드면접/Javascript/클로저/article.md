# React Hook은 실제로 어떻게 동작할까?

## React Hooks의 장점중 대표

- 클래스와 고차 컴포넌트의 복잡성을 피할 수 있다.

## useState는 클로저로 동작을 한다

- useState함수내부에는 state함수와 setState 함수가 존재한다.
- state함수는 useState함수 변수인 \_value값을 참조하고있다
- setState함수는 새로운 state를 매개변수로 받고 useState함수의 변수인\_value값을변경

```js
function useState(initialValue) {
  var _val = initialValue; // _val은 useState에 의해 만들어진 지역 변수입니다.
  function state() {
    // state는 내부 함수이자 클로저입니다.
    return _val; // state()는 부모 함수에 정의된 _val을 참조합니다.
  }
  function setState(newVal) {
    // 마찬가지
    _val = newVal; // _val를 노출하지 않고 _val를 변경합니다.
  }
  return [state, setState]; // 외부에서 사용하기 위해 함수들을 노출
}
var [foo, setFoo] = useState(0); // 배열 구조분해 사용
console.log(foo()); // 0 출력 - 위에서 넘긴 initialValue
setFoo(1); // useState의 스코프 내부에 있는 _val를 변경합니다.
console.log(foo()); // 1 출력 - 동일한 호출하지만 새로운 initialValue
```
