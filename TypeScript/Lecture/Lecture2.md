# 타입스크립트 타입 별칭 
- 타입 별칭으로 특정한 타입을 만들수있음 

~~~ ts

const name:string

// 타입 별칭 사용 예시
type MyName=string
const name:MyName='hello'

type Developer={
    name:string;
    skill:string
}

function getDeveloper(human:Developer) :Developer{

}

~~~


# 타입스크립트 readonly 속성
- readOnly 속성을 지정하여 해당 변수를 수정 하지 못하게할수있음 
~~~ts

type Player={
    readonly name:string
    age?:Age
}

// readonly 속성
const numbers:readonly number[]=[1,2,3,4]

~~~

# 타입스크립트의 기타 타입들 

~~~ts

// Any 타입 (어떠한 타입이든 들어올수있음)
let str: any = 'hi';
let num: any = 10;

// void 타입 
// 변수에는 undefined와 null만 할당 가능 
let unuseful: void = undefined; 

//함수는 return type이 void임  (아무것도 반환하지않는다는것을 명시)
function notuse(): void {
  console.log('sth');
}

// never 타입 
// return 을 시키지 않고 Error를 표시할떄 사용
function hello():never{
    throw new Error('error')
}
// unknown타입 
// 변수가 어떤게 들어 올지  못할때 사용가능 
let a:unknown