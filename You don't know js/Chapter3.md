# Chapter 3 네이티브
- 네이티브 종류 String ,Number , Boolean ,Array ,Object, Function ,RegExp ,date ,Error ,Symbol
  - 네이티브는 내장함수 new 키워드로 호출가능
- Object의 하위 타입이다
- Class라는 내부 프로퍼티가 추가로 붙고 Object.prototype.toString() 메소드로 볼수있음 ([object String])
  - typeof Object인값은 내부 프로퍼티 [Class]가 붙는다.


## new String (네이티브)
- 원시값 을 감싼 객체 래퍼이다 (원시값은 아니다)
- object의 하위 타입 ([object String])
- typeof 시 Object


## 원시값도 내부 Class가 존재할까 ?
> 존재한다
- Object.prototype.toString.call을 사용하여 호출을 하면 타입을 볼수있음
- 문자열 ,숫자 , 불리언 같은 원시값은 박싱 과정을 거친다.


## 객체 래퍼
- 원시값 자체로만 봤을떈 프로퍼티나 메서드가 없어 객체래퍼로 감싸주는게 원칙이나 , 자바스크립트는 알아서 래핑을 해주어서 원시값으로도 메소드에 쉽게접근가능
  - 이 말은 직접 객체형태로 쓸 필요가 없고 (new Number new String) 원시값형태로 불러오자!
- 객체 래퍼로 직접 감쌋을떄 예상치 못한 결과가 나오는 경우가있음  => 권장하지않음
  - var a= new Boolean(false) => false인데 true나옴 // Object 함수를 이용하면 됨
    - 네이티브를 사용하는것을 지양해라


