# 3장 this

# 자바스크립트에서 this란?
1. Javscript에서 this는 상황에따라 바라보는 대상이 달라짐
2. 실행컨텍스트가 생성될때 this가 결정된다 (즉 함수 호출시)
3. 호출하는 대상에 따라 this가 달라짐
4. 자신이 속한 객체 or 자신이 생성할 인스턴스를 가리키는 자기 참조 변수

## 전역공간에서 this
- 전역객체를 의미한다.
> why ? 전역 컨텍스트를 생성하는 주체가 전역객체이기때문(window)
~~~ js
var a=1;
console.log(a) // 1
console.log(window.a) //1
console.log(this.a) //1
=> 전역에 변수를 선언시 자바스크립트 엔진은 전역객체의 프로퍼티로 할당
~~~

## 메소드로서 호출할때의 this 
- 메소드는 객체의 프로퍼티에 있는 함수
- this는 (메소드를 호출한 주체 . 앞에 있는것) 

## 함수로서 호출할때의 this
- 함수는 독립된 그 자체 
- 호출시 this는 (window) 함수 그자체 

## 화살표함수의 this
- 화살표 함수는 this 바인딩을 하지않음
- 상위스코프의 this를 그대로 활용

## 콜백함수의 this
- 일반적으로 콜백함수의 this는 window다 , 단 콜백함수마다 this는 다름 document문서에 나옴
- 단 addEventListener의 this는 addEventListener를 명시한 document객체

## 생성자함수의 this
- 생성자함수란? : 구체적인 인스턴스를 만들기위한 틀 (함수로선언 or 클래스로선언)
- 즉 생성자함수의 this는 생성자함수에 의해 만들어진 인스턴스이다

# 명시적으로 this를 바인딩하는 방법
1. call 메소드를 사용
- 호출하고 싶은 함수의 this를 명시적으로 바인딩할수있음
- 첫번쨰 인자는 this 바인딩할값, 두번째 인자부터는 함수에들어갈 인자값

2. apply메소드를 사용
- call과 마찬가지로 호출하고싶은 함수의 this를 명시적으로 바인딩할수있음 
- 첫번째 인자는 this 두번쨰부터는 인자인데 배열형태로받음

3. bind 메소드를 사용
- this와 넘겨받은 인자를 바탕으로 새로운 함수를 반환함 (호출x call과 apply처럼)
- 첫번쨰는 this, 두번쨰는 인자값들
- bind 메소드를 사용하면 name프로퍼티는 bound func이라는 접두어가 붙음

## call apply 메소드 활용
1. 유사배열 객체 활용한 예시
- 유사배열 객체란 ?
  - 배열과 비슷하지만 배열이아닌 Object이다
  - length 프로퍼티를 가지고 있음
  - 주로 DOM에서 가져온 Element List들  arguments 객체  , 문자열배열
  - key : value 형태로 되어있으며 key=0부터 시작

2. 유사배열 객체에 배열메소드를 적용하기  (프로토타입으로 바인딩)
~~~ js
var obj={
	0:'a',
	1:'b',
	2:'c',
	length:3
}; 
Array.prototype.push.call(obj,'d') //=> {0:'a',1:'b',2:'c',3:'d',length:4}
var arr=Array.prototype.slice.call(obj) // => ['a','b','c','d']
~~~
>ES6에 추가된 Array.from 메소드로 유사배열객체를 배열로 쉽게 변환할수있음

this를 왜 사용할까? (좀 더 알아보기)
- this를 사용하면 생성자함수에 대한 인스턴스의 복제가 쉽다 (유사한객체를 만들기가쉬워짐)
