# 자바스크립트 엔진 구조

- 자바스크립트는 메모리 Heap과 CallStack으로 구성되어있다 (v8엔진)
- 싱글스레드 언어이므로 CallStack은 하나이다
- 이벤트루프를 통해 동시성을 지원한다 (싱글스레드의 문제점을 해결함)

# CallStack

- 원시형 데이터타입과, 실행컨텍스트 (스코프체인, this바인딩)가 저장된다.
- Address(식별자) , Value로구성 (Value에는 참조형데이터의 주소도 담겨있음 ,원시형 value)
- 코드의 실행순서를 관리

# Heap

- 참조형 데이터가 저장 (배열 객체)
- 동일한 참조형 데이터도 Heap의 새로운 주소에 새롭게 저장
  - let obj = { a: 1, b: 2 };
    let obj2 = { a: 1, b: 2 }; // console.log(obj, obj2);// ???

# 참고

- https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/
