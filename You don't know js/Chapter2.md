# Chapter 2 (값)

## 배열 
- 자바스크립트의 배열은 문자열,숫자,객체,다른배열 등 어떤 타입의 값이라도 담을수있다.

## 배열의 사용에서 주의해야할 점
~~~js
var a=[]
a[0]=1
a["foobar"]=2
a.length=1
a["foobar"] // 2 출력
a.foobar // 2출력 
배열에는 키값이 할당이되나 배열의길이는 증가하지않음 ! 

a[0]=1
a[2]=3 
console.log(a[1]) ? //undefined 명시적 undefined랑은 다르다
console.log(a.length) //3 

a["13"]=42 ; // ? a.length => 14가됨 13는 문자열이지만 숫자로 인식
~~~
> 배열에 문자열 타입의 키 /프로퍼티를 두지말자 => 키 프로퍼티는 객체를 대용하는게 좋음

## 유사배열을 배열로 변환하는방법
> 유사배열은 DOM 쿼리 작업을 수행할시 DOM 원소리스트를 반환하는 요소 or aruguments 객체
1. Array.prototype.slice.call(유사배열)
2. Array.from(유사배열)
3. rest parameter


## 문자열
- 자바스크립트에서 문자열은 문자배열과 같지않다! => "abc" , ["a","b","c"] 다름 => concat , indexOf사용은가능
  - 문자열은 불변값 (인덱스 접근후 변경 x, 문자열메소드를 통해 변경은 되지만 새로운 문자열 생성후 반환)
  - 문자배열은 가변값 (인덱스 접근후 변경가능 , 새로운 문자열 x 그 즉시 변경)

> Tip: 문자열에 유용한 메소드는 문자배열 형태에서 사용할수있으므로 문자배열 형태로 바꿔서 이용하는게좋다
~~~ js
var c="a".split("") => // 문자배열 
c.join("") //다시 문자열로 반환할떈
~~~

## 숫자
- 정수와 부동소수점 숫자를 따른다.
- 숫자 값은 Number 객체 래퍼로 박싱이 가능하고 Number 메소드로 접근할수있음

> 숫자 사용예시

~~~js
var a=42;
var b=42.3;
var c=0.42;

var d=5E10 => 아주크거나 아주작은 지수는 지수형으로 표현 toExponential 메소드를 사용 => 5e+10 

var e=42.59 
e.toFixed(0) =>43
e.toFixed(1)=>42.6
e.toFixed(2) => 42.59
~~~

## 작은소수값
- 0.1+0.2===3 false출력 => 정확한 0.3이아니기떄문
  > 미세한 반올림 오차를 허용하기위해 머신 입실론을 적용한다.
  ~~~js
  function numbersCloseEnoughToEqual(n1,n2){
    return Math.abs(n1-n2) < Number.EPSILON;
  }
  ~~~

## 특수값
- undefined
  - 실종된 값이다
  - 값을 아직 가지지 않은것
  - 식별자로 사용이 가능하여 주의해야됨

- null
  - 빈 값이다
  - 예전에 값이 있었지만 지금은 없는 상태다

- void 
  - 어떠한 값이든 무효로 만들어 항상 결과값이 undefined가 되게함 (var a= 42 , => void a => undefined)
  - 값이 존재하는 곳에서 그 값이 undefined가 되게 한다

## 특수 숫자
1. NaN
- 유효하지 않은 숫자 , 실패한 숫자 
- 비교불능이라 isNaN 메소드로 가능 => isNaN은 버그가 존재하여 Number.isNan으로 사용하는거 추천!

2. 무한대
- 1/0 === Infinity , -1/0 -Infinity

> 자바스크립트는 동등 비교시 문제가 되는 부분들이 많으므로 Object.is로 안전하게 동등비교하자


## 값 vs 레퍼런스
1. 값 
- null,undefined,string,number,boolean symbol
- 불변이다

2. 래퍼런스
- 공유된 값을 가리킨다. (객체 ,배열) 
  - 공유된 값을 가리키므로 함수에 인자로 전달하여 함수내부에서 사용할경우 외부에 영향을 끼침
- 불변이아니라 언제든지 함수 내부에서변경이 가능 

래퍼런스 코드 예제
~~~js
function foo(x){
  x.push(4)
  x // [1,2,3,4]

  x=[4,5,6] //새로운 배열할당이라 외부에 영향 x
  x.push(7)
  x // [4,5,6,7]
}
var a= [1,2,3]
foo(a) 
a // [1,2,3,4]



~~~