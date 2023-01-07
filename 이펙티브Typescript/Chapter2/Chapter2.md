# 타입 시스템

## 아이템 6

- 타입을 지정하지 않아도 변수와 함수의 타입을 추론할수있다,
  - vscode 상에서 보여주기에 타입명세시 도움이 많이됨
- Vscode Go to Definction을 통해 정확한 타입을 볼수있다.
- 타입 선언파일을 봐서 타입스크립트에 타입을 잘 지정해라

## 아이템 7

- 타입을 값들의 집합으로 봐라
- 엄격한 상속관계가아니라 겹치지는 집합으로 생각해라 (벤다이어그램))

## 리터럴 타입
- 유닛 타입이며 작은집합이라고도 부름 (한가지 값만 포함)
~~~ ts
type A = "A"; // 작은집합 (리터럴 타입)
~~~

## 유니온 타입 
- 두개이상의 타입을 묶을떄 사용한다
~~~ ts
type AB = "A" | "B"; //유니온 두개이상의 타입이 들어올떄 사용
type Ab="A"|"B"|12;
~~~
## 인터섹션 타입 (교집합)
- 공통속성을 가지는 타입 
- 두개의 타입이 속성이 없어도 둘다 가지고있는 속성을 포함
```ts

interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & LifeSpan;
// 인터섹션 교집합을 뜻함 => Perosn과 LifeSpan 둘다 가지는 값

const ps: Person = {
  // 정상
  name: "Alan Turing",
  birth: new Date("1912/06/23"),
  death: new Date("1954/06/07"),
};
```

## extends
- ~의 부분집합 주로 타입확장시 사용
- A는B를 상속 , A는 B에 할당가능 A는 B의 서브타입 , A는 B의 부분집합 같은 의미

~~~ ts
interface Person{
  name:string
}
interface PersonSpan extends Person{
  birth:Date;
  death?:Date;
}

~~~

# 아이템 8 타입공간과 값 공간의 심벌 구분하기

- 타입 스크립트의 심벌은 타입 공간 또는 값 공간중의 한곳에 존재한다.

~~~ ts
1. 값에서의 심벌 
const Cylinder=(radius:number,height:number)=>({radius,height})

2. 타입공간에서의 심벌
interface Cylinder{
  radius:number;
  height:number;
}
~~~  
두개를 구별하는방법
1. 런타임시에 사라지냐 안사라지냐로 판별 (타입은 사라짐)
2. 변수에 값을 할당하냐 할당하지않냐

## typeof 연산자
- 타입에서 쓸때와 , 값에서 쓸때가 교차하는 부분
1. 타입으로 쓴다면 타입스크립트 타입을 반환
2. 값의관점에서는 자바스크립트 런타임의 typeof 연산자가 된다.
~~~ ts
type T1=typeof p;
type T2=typeof email;
//  타입으로 쓸때

// 값으로 쓸떄
const v1=typeof p;
const v2=typeof email
~~~

## 핵심 
> 타입에서 쓸때랑 값에서 쓸때의 차이
1. this
- 자바스크립트 this 키워드 (값) ,다형성 this (타입스크립트)
2. & | 
- AND OR 연산자 (값) , 인터섹션과 유니온 (타입스크립트)
3. const
- 변수 선언 (값) , as const (리터럴 또는 리터럴 표현식의 추론된 타입으로 바꾼다.)
4. class와 enum
5. type과 interface (타입스크립트)


# 아이템 9 : 타입 단언보다는 타입 선언 사용하기

```ts
interface Person {
  name: string;
}
const alice: Person = { name: "Alice" }; //타입선언
const bob = { name: "Bob" } as Person; //타입 단언
```

- 타입 선언은 할당되는 값이 해당 인터페이스를 만족하는지 검사한다 (추천)
- 타입 단언은 개발자가 타입을 강제로 지정 (타입체커는 에러감지 불가) (비추천)
  - 타입스크립트보다 내가타입을 더 잘알다싶으면 사용

## 타입 단언이 필요한 예시

- 타입스크립트는 DOM에 접근할수 없기떄문에 엘리먼트를 알지못해서 DOM타입에대해서는 타입단언문을 사용한다.

# 아이템 10 : 객체 래퍼 타입 피하기

- 타입스크립트는 기본형과 객체 래퍼 타입을 별도로 모델링한다

- 객체 래퍼타입이란?
  - 기본형의 변수가 메소드를 사용할수있해준다. (기본형->객체래퍼타입->기본형) 
  - string (String) , number (Number) , boolean (Boolean), symbol (Symbol) , bigint(BigInt)
    - 괄호는 래퍼타입
> 타입스크립트는 객체 래퍼타입을 타입으로 쓰는것을 지양하고 기본형타입을 사용해야한다.  


# 아이템 11 : 잉여 속성 체크의 한계 인지하기

## 잉여 속성 체크

- 타입시스템의 구조적 본질을 해치지 않으면서 객체 리터럴에 알수없는 속성을 허용하지않음 (엄격한 객체 리터럴 체크)
  - But document나 new HTMLAnchorElement는 잉여속성체크가 되지않음
  - 임시변수를 도입해도 잉여 속성체크를 건너뛸수있음

```ts
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
// 좋은 예시 : 객체 리터럴에 알수없는 속성 허용 x
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present", // 
};

//  나쁜예시
const obj2 = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
};
const r: Room = obj2; //obj2 타입은 RooM에 맞지않으나 부분집합을 포함하므로 타입체커도 통과한다 //잉여속성체크 안함

interface Options{
  title:string;
  darkMode?:booelan;
}
// 좋은예시

const o:Options={darkmode:true,title:'Ski Free'}

// 나쁜예시 (감지못함)
// 2번째줄이 객체리터럴이 아니기떄문에
const intermediate={darkmode:true,title:'Ski Free'}
const o:Options=intermediate

const o ={darkmode:true,title:'Ski Free'} as Options; // 타입단언 비추천

```

# 아이템 12 : 함수 표현식에 타입스크립트 적용하기
> 타입스크립트에서는 함수의 매개변수에 타입선언을 하는것보다 함수표현식 전체타입에 정의하는것이 코드도 간결해지고 안전해진다.
1. 타입스크립트에서는 함수 표현식을 사용하는게 좋다
  - 함수의 매개변수부터 반환값까지 전체를 함수타입으로 선언하면 함수 표현식에 재사용할수있는 장점을 가짐
  - 함수 표현식을 사용하면 parameter에 대해 타입추론을할수있게도와준다.
  - 매개변수나 반환값에 타입을 명시하기보다는 함수 표현식 전체에 타입구문을 적용해라
    - typeof fn을 통해 다른함수의 시그니처를 참조할수있음 (fetch함수)
2. 타입 시그니처를 반복적으로 작성한 코드가 있다면 함수타입을 분리하거나 , 라이브러리내에서 타입을 찾는다.

```ts

1번 예시
async function checkedFetch(input:RequestInfo,init?:RequestInit){
  const response=await fetch(input,init)
  if(!response.ok){
    throw new Error('Request failed: ' + response.status)
  }
  return response;
}

// typeof fn 사용하는 예시  (아래와같이 함수표현식으로 사용하는게 좋음)
const checkedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("Request failed " + response.status);
  }
  return response;
};

// 2번 예시 : 함수 표현식을 재사용
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;

```

# 아이템 13 : 타입과 인터페이스의 차이점 알기

- 대부분의 경우에는 타입과 인터페이스를 사용해도된다 (공통)

  1. 인덱스 시그니처도 둘다 사용가능
  2. 함수타입도 둘다가능
  3. 제네릭도 둘다가능
  4. 둘다 타입 확장가능 하지만 인터페이스는 복잡한 타입을 확장하기 힘듬

- 차이점

```ts
// 타입 확장 
// 인터페이스와 타입 예시
interface IStateWithPop extends Tstate{
  population:number;
}
type TStateWithPop=Istate & {population:number}

// 1. 유니온타입에 name속성 확장하는 예시 (인터페이스는 불가능함)
type NameVariable = (Input | Output) & { name: string };

// 2. 인터페이스는 선언병합이가능하다. 타입은 불가능하다 (하지만 잘못된설계방식이라 비추)
interface Istate {
  name: string;
  capital: string;
}
interface Istate {
  population: number;
}
const wyoming: Istate = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 500_000,
}; //정상
```

결론

1. 복잡한 타입일경우에는 타입 확장 자유도가 높은 타입별칭을 사용 (주요)
2. 간단한 객체 타입일경우에는 일관성과 보강의 관점에서 생각해바야한다
3. 인터페이스만 사용하던가 , 타입만사용하던가

# 아이템 14 : 타입 연산과 제네릭 사용으로 반복 줄이기

```ts
1. 중복된 타입에 타입을 붙여 반복을 줄이자
interface Point2D {
  x: number;
  y: number;
}

function distance(a: Point2D, b: Point2D);

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function get(url:string,opts:Options):Promise<Response>
function post(url:string,opts:Options):Promise<Response>
type HTTPFunction=(url:string,opts:Options)

const get:HTTPFunction=(url,opt)=>{};
const post:HTTPfunction=(url,opt)=>{};

2. 인터페이스나 타입별칭으로 확장시키기
interface Person {
  firstName: string;
  lastName: string;
}
interface PersonWithBirthDate extends Person {
  birth: Date;
}
type PersonWithBirthDate = Person & { birth: Date };


3. Mapped 타입 사용
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}
// TopNavState를 State의 부분집합으로 
type TopNavState = {
  [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
};
// => pick으로 대체가능
type TopNavState =Pick<State,'userId' | 'pageTitle' | 'recentFiles'>
type TopNavKeys=keyof State

4. 값으로 부터 타입 정의
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  colors: "#00FF00",
  label: "VGA",
};
// interface Options {
//   width: number;
//   height: number;
//   color: string;
//   label: string;
// }
type Options = typeof INIT_OPTIONS;

```
~~~ ts
5. 함수나 메소드의 반환값에 타입 정의
function getUserInfo(userId:string){
  return {
    userId,
    name,
    age,
    height,
    weight,
    favoriteColor
  }
}
type UserInfo=ReturnType<typeof getUserInfo>

6. 제네릭 관련내용 (타입스크립트 핸드북 다시보고 봐야할듯 p82~p84)

~~~
# 아이템 15 : 동적 데이터에 인덱스 시그니처 사용하기

```ts


type Rocket = { [property: string]: string };
const rocket: Rocket = {
  name: "Falcon 9",
  variant: "v1.0",
  thrust: "4,940 kN",
};

키의이름 : property
키타입 :string
값 타입 : string

```

## 인덱스 시그니처 단점

> 안전하게사용하기위해선 undefined를 추가해야됨 조건문에

1. 잘못된 키를 포함해 모든키 허용
2. 특정키가 필요하지않음
3. 키마다 다른타입을 가질수없음
4. 자동완성기능 제대로동작x

## 인덱스 시그니처를 대안할수있는방법

```ts
1. Record를 사용하는 방법
type Vec3D=Record<'x'|'y'|'z',number>

Type Vec3D{
  x:number;
  y:number;
  z:number;
}

2. 매핑된 타입을 사용
type Vec3D={[k in 'x' | 'y' | 'z']:number}

type Abc={[k in 'a' | 'b' | 'c']: k extends 'b' ? string:number}
Type ABC={
  a:number;
  b:string;
  c:number;
}

```
- 인덱스 시그니처는 동적데이터를 표현할떄 주로 사용 (CSV파일 )
  - why ? : 특정 열 이름이 뭔지 모르므로

## item 16 number 인덱스 시그니처보다는 Array, 튜플,ArrayLike 사용

~~~ ts
x=[1,2,3] => x['1'] // 문자열 키를 사용해도 자바스크립트는 배열요소에 접근가능
// Object.keys(x)로 배열의키를 나열해보면 키가 문자열로 출력
~~~

- 자바스크립트에서는 배열 인덱스들이 문자열로 변환되어 사용이되어 문자열로 접근이 가능하다
  -  하지만 타입스크립트에서는 타입체크 시점에 배열의 인덱스를 숫자로 받는다.  런타임시에는 문자열로도 돌아가지만
- for-in 루프는 key를 string으로 받고 성능이 느려 배열 순회시 사용 비추
- 인덱스 시그니처에 number를 사용하기보단 Array나 튜플 ArrayLike를 사용해라

## item 17 변경 관련된 오류 방지를 위해 readonly를 사용해라

> 매개변수로 참조형데이터를 받게되면 내부에서 변경될 우려가존재

- 매개변수를 readonly로 선언할시 다음과 같은일 발생
  - 타입스크립트가 매개변수가 함수내에서 변경되는지 체크
  - 함수를 호출하는쪽에서는 함수가 매개변수를 변경하지 않는다는 보장을 받음
  - 호출하는 쪽도 readonly 배열을 매개변수로 넣을수있음

- 인덱스 시그니처에서도 readonly가 가능하다.

1. readonly의 단점

- 중첩객체에서는 readonly가 제대로 동작않어 깊은 readonly타입을 사용해야한다 (ts-essentials에 있는 DeepReadonly)
  - readonly는 얕게 동작한다.

## item 18 매핑된 타입을 사용하여 값을 동기화하기

- 매핑된 타입을 쓰게되면 타입스크립트가 코드에 제약을 강제하도록 할수있음
- 매핑된 타입은 한 객체가 또 다른객체와 정확히 같은속성을 가지게 할떄이상적

코드예시

```ts
interface ScatterProps {
  xs: number[];
  ys: number[];

  xRange: [number, number];
  yRange: [number, number];
  color: string;

  onClick: (x: number, y: number, index: number) => void;
}
const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
};
```
