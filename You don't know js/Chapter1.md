# 챕터 1 요약
- 자바스크립트는 동적언어여서 타입이 없다고 생각하는 개발자가 많은데 이는 오해다!
  - ECMASCript 언어 타입과 명세 타입으로 분류된다
- 자바스크립트는 변수에는 타입이 존재하지 않으나 값에는 존재한다.
- undefined랑 ,undeclared는 서로 다르다 (typeof 시에는 같으나 명백히다름)


## 내장 타입
- null(object),undefiend(undefined) , boolean ,number ,string, object ,symbol(ES6)
  - 원시타입이라고 부른다.

## function 타입
- object의 하위타입 
- 호출가능한객체 (내부 프로퍼티 [Call])
- typeof function a() ==== function => true
- 함수이름.length => 함수의 인자 길이


## 자바스크립트에서 변수에 값이 없을때와 변수 선언이 되지않을떄 타입
~~~js
var a;
console.log(a) // undefiend
console.log(b) // ReferenceError => b is not defined (선언자체가 안됨) 


console.log(typeof a) // undefined
console.log(typeof b) //undefined
=> 선언이안된것도 타입체킹할시 undefined가 발생 (이상한문제 !) //브라우저환경에서도 동일함
=> 그러나 이는 유용하게 사용할수있다.
~~~

## typeof의 활용 
1. 애플리케이션 코드에서 ReferenceError가 나지 않게 하기위해 typeof를 명시해서 사용
  - 개발자가 실수로 변수를 명시 하지않았을떄 주로 활용 된다.

