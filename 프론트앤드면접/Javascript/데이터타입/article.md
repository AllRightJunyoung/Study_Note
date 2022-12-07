# 자바스크립트 엔진 구조

- 자바스크립트는 메모리 Heap과 CallStack으로 구성되어있다 (v8엔진)
- 싱글스레드 언어이므로 CallStack은 하나이다
- 이벤트루프를 통해 동시성을 지원한다 (싱글스레드의 문제점을 해결함)

# CallStack

- 원시형 데이터타입과, 실행컨텍스트 (스코프체인, this바인딩)가 저장된다.
- Address(식별자) , Value로구성 (Value에는 참조형데이터의 주소도 담겨있음 ,원시형 value)
- 코드의 실행순서를 관리
- 콜스택이 계속 쌓이면 스택오버플로우 발생 (재귀돌릴떄)

# Heap

- 참조형 데이터가 저장 (배열 객체)
- 동일한 참조형 데이터도 Heap의 새로운 주소에 새롭게 저장
  - let obj = { a: 1, b: 2 };
    let obj2 = { a: 1, b: 2 }; // console.log(obj, obj2);// ???

# 콜스택과 힙의 공간은 한정적이다

- 자바스크립트는 공간을 효율적으로 관리하기 위해 더이상 사용하지않는 변수나 함수를 가비지 컬렉터를 이용해서 메모리를 여유롭게 관리한다.
  - 자바스크립트의 가비지컬렉터는 Mark and Sweep 알고리즘의 원리

## 메모리누수가 생기는 경우 (메모리 낭비?)

1. 전역변수를 많이 만드는경우
2. 이벤트 리스너 사용후 제거하지 않는 경우
3. setInterval 함수 사용 (가비지컬렉터에 의해 제거되지 못함)

# 참고

- https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/
- https://soldonii.tistory.com/53
