# 자바스크립트의 this

> this의 정확한 정의 솔직히 모르겠음 (예전 멘토링떄 제대로 답변안줘서 ..)

1. 실행 컨텍스트가 생성될떄 this는 결정된다
2. 호출하는 대상에 따라 this가 달라진다.
3. 실행 컨텍스트를 생성한 주체 or 객체 ? (자신이 속한 객체 , 자신이 생성할 인스턴스를 가리키는 자기 참조 변수)
4. 다른 언어와 다르게 Javscript에서의 this는 상황에 따라 바라보는 대상이 달라져 까다로움.. (중요)

## 상황별 this

1. 전역공간에서의 this

- 전역객체 (전역 컨텍스트를 생성한 주체는 전역 객체) ,window의 프로퍼티로 접근가능
- Node.js에서 this는 글로벌이다

2. 메소드로서 호출할떄의 this

- 메소드를 호출한 주체 (.앞에 있는것)

3. 함수로서 호출할떄의 this

- 특이하게도 this는 window
  > but use strict 스트릭트 모드에서는 undefined출력

4. 화살표 함수의 this

- 화살표함수는 this바인딩을 하지않아 상위스코프의 this를 활용

5. 콜백함수의 this

- window (브라우저 환경) , Node.js는 undefiend
- addEventListner의 this는 addEventListner를 명시한 document객체

6. 생성자 함수의 this

- 생성자 함수에 의해 만들어진 인스턴스

7. 클래스 에서의 this

- 정적 메소드나 , 정적 변수 사용시 => 클래스
- 인스턴스메소드나 , 인스턴스 변수 사용시 => 인스턴스

## 명시적 this 바인딩

1. call 메소드

- 호출하고 싶은 함수의 this를 명시적으로 바인딩
- 첫번째 인자는 this 바인딩 할 것 , 두번째인자는 함수에 들어갈 인자값

2. apply 메소드

- call과 마찬가지로 호출하고 싶은 함수의 this를 명시적으로 바인딩
- 첫번쨰 인자는 this , 두번째 인자는 배열형태

3. bind 메소드를 사용한 방법

- this와 넘겨 받은 인자를 바탕으로 새로운함수를 반환
- 첫번째 this , 두번쨰는 인자값들
- bind메소드 사용시 name프로퍼티는 bound func접두어가 붙음

## 명시적 바인딩 코드예

```js
// 유사 배열객체에서의 활용
var argv = Array.prototype.slice.call(arguments);
argv.forEach(function (arg) {
  console.log(arg);
});

// Array.from 사용
var argv = Array.from(arguments);

var numbers = [10, 20, 30, 40, 50];
var max = Math.max.apply(null, numbers);
var max = Math.max(...numbers);

var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4);
var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8);
```

## this를 왜 사용하나?

- this 사용을 통해 생성자 함수에 대한 인스턴스 복제가 쉬워짐

## 암묵적 바인딩 예시

```js
// 함수호출시 this는 전역객체이므로 window 객체에 암묵적으로 바인딩됨
window.a = "window";

function foo() {
  console.log(this.a);
}

const obj = {
  a: 1,
  foo: foo,
};

obj.foo(); // 1
foo(); // window

// 예시 2
// 함수 자체를 호출하면 window.name
// 객체로 호출하면 객체.hello

function hello() {
  console.log(this.name);
}
var obj = {
  name: "chris",
  hello: hello,
};

obj.hello(); // 'chris'
```
