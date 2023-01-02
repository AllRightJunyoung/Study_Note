# any 다루기
- 타입스크립트의 타입시스템은 정적이면서 동적인 특징을 가진다
  - 이러한 특징으로 프로그램의 일부분에만 타입 시스템 적용이가능하다
    - 자바스크립트 코드를 타입스크립트로 전환 또한 가능해짐

## 아이템 38 : any 타입은 가능한 한 좁은 범위에서만 사용하자

~~~ ts
예시 1 
function processBar(b:Bar){} // 매개변수로 Bar타입만들어올수있으나 Bar말고도 foo가 들어오게하는방법은?
function f1(){
    const x:any=expressionReturningFoo() // x는 any로된다
    processBar(x) // x가 any므로 매개변수 우회가능
}
function f2(){
    const x=expressionReturningFoo()
    processBar(x as any) // x는 any로 타입단언
}

// f1의 문제점은 스코프내에서 x를 사용하는 것에 전부 any의 영향을 받는다 (타입범위가 넓어짐)
// f2처럼 매개변수로만 타입단언을 해준다면 타입 범위는 좁아지고 해당 함수를 호출할떄만 any가 사용된다.

~~~
예시 2 
- 객체의 특정 속성에 any가 필요할떄 객체 자체에 any로 선안하지말기

~~~ts
const config:Config={
    a:1,
    b:2,
    c:{
        key:value
    }
} as any // 이렇게 하지말기

const config:Config={
    a:1,
    b:2,
    c:{
        key: value as any
    }
};
~~~
TIP
- 함수의 반환 타입을 명시하여 함수바깥으로 영향을 미치는것을 방지 할수있다
- any 의 사용범위를 최소한으로 좁혀라 (위 두예제가 그렇다)
- 강제로 타입오류 제거시 any 대신 ts-ignore를 사용해라

## 아이템 39 any를 구체적으로 변형해서 사용하기

예시 1
> 배열형태에 any를 사용할떈 any[] 를 사용해라
~~~ ts
function getLengthBad(array:any){ //비추천 : 타입이 넓어짐
    return array.length
}

function getLength(array:any[]){ // 추천 : 타입이 좁아짐

}
~~~
예시 2  
> 객체일때는 {[key:string]:any} 로선언해라

~~~ ts
function hasTwolvelLetterkey(o:{[key:string]: any}){ // good practice  
}
~~~

## 요약
- any보다 정확하게 모델링할수있는경우에는 any를 구체적으로 사용해서 타입을 좁혀라

## 아이템 40 : 함수 안으로 타입 단언문을 감춰라 (내용잘안읽힘)
- 함수 구현시 내부 로직이 복잡해서 안전한 타입으로 구현하기가 어려운경우가 많다
  - 그래서 함수 내부에서는 타입단언을 사용하고, 함수 외부로 드러나는 타입 정의를 정확히 명시하는것이 좋다

## 아이템 41 : any의 진화를 이해하기
~~~ ts
예제 1 
const result=[]
result.push('a') 
result => string[]
result.push(1) => string | number []

예제 2
let val; 타입 => any
if(Math.random()<0.5){
    val=/hello/; //타입 === regExp
}
else{
    val=12
    //타입 === number
}
~~~
> 값이 할당될떄는 any의 타입은 변화될수있다 . 하지만 forEach라든지 배열메소드를 사용할때는 any타입은 진화하지 않는다.

- any를 진화시키는 방법보다는 명시적 타입 구문으로 안전한타입을 유지해라 !
