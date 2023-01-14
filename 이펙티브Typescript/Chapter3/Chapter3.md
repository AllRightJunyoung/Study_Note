# 3장 타입추론

## 타입추론에 대해

> 타입을 추론시켜준다고 보면됨
- 타입스크립트에서 적극적으로 수행한다
- 수동으로 명시해야하는 타입의 구문수를 엄청 줄여준다 (코드의 안정성 향상)
> 초보자들은 숙련자에비해 불필요한 타입이 많다.

## 아이템 19 : 추론 가능한 타입을 사용해 장황한 코드방지하기
- 타입추론이 가능하면 불필요한 명시적 타입구문은 필요없다
  - 편집기를 통해 체크하는게 낫다
  - 오히려 더 복잡해진다

~~~ tsx
// 불필요한 타입 
let x:number=12
// 타입추론충분히가능
let x=12 ;
~~~
## 명시적 타입 구문보다는 비구조화 할당문 사용하자 (예시)
> 비구조화 할당문도 모든 지역변수의 타입을 추론한다. (명시적 타입을 구문으로 넣으면 코드가 번잡해진다.)
~~~ ts
interface Product{
  id:string;
  name:string;
  price:number;
}
// 명시적 타입 구문 예시
function logProduct(product:Product){
  const id:number=product.id
  const name:string=product.name
  const price:number=product.price  
}
// 비구조화 할당문 예시
function logProduct(product:Product){
  const {id,name,price}=product
}
~~~
## 함수/메서드 시그니처에서 타입 구문
- 함수내에서 생성된 지역변수에는 타입구문을 최소화하는게 좋음

## 객체 리터럴 정의에서 타입 구문
> 객체리터럴에는 타입구문을 쓰는게 좋다 실제로 실수가 많이 발생하는 영역이기 떄문

```ts
const elmo: Product = {
  name: "Ticle",
  id: 3423,
  price: 28.3,
};
```

## 함수의 반환에서의 타입을 명시해서 오류를 잡아라
- 반환 타입을 명시하면 함수에 대해 더 명확히 알수있다
- 반환 타입을 명시하면 명명된 타입을 사용할수있다. (사용자가 더 직관적으로 알수있게됨)
- 오류의 위치를 제대로 표시해준다.
## 아이템 20 다른타입에는 다른 변수 사용하기

> 자바스크립트에서는 하나의 변수를 다른 목적을 가지는 다른 타입으로 재사용이 가능하다 (숫자나 문자)

- 서로 관련이 없는 두개의 값으로 분리할경우의 장점
  - 변수명을 구체적으로 지을수있음
  - 타입 추론을 향상 , 타입구문이 불필요해짐
  - 타입이 좀 더 간결해짐
  - let대신 const변수를 사용하게됨

## 아이템 21 타입넓히기

- 타입스크립트는 타입을 추론할떄 명확성과 유연성 사이의 균형을 유지한다
- let 키워드로 변수를 선언한다면 좀 더 넓은 타입으로 타입추론이된다.

## 타입 넓히기 예시

- 타입 넓히기가 진행되면 주어진 값으로 추론가능한 타입이 여러개가 발생한다. 이거때문에 오류가 많이발생

```ts
interface Vector3 {
  x: number;
  y: number;
  z: number;
}
function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
  return vector[axis];
}

let x = "x";
let vec = { x: 10, y: 20, z: 30 };
getComponent(vec, x); //x는 string이므로 오류발생한다 => 타입 할당시점에 넓히기가 동작하여
// string으로 추론됨
// 변수 선언도 let으로 되어있어서 그런거같음
```

타입 추론의 강도를 직접 제어하는 방법

```ts
1. 명시적 타입 구문을 제공한다
const v:{x:1|3|5}={
  x:1,
};
2. 타입 체커에 추가적인 문맥을 제공한다 (함수의 매개변수로 값을 전달)

3. const 단언문을 사용하여 타입 추론을 좁게 할수있다.
예시
const v1={
  x:1,
  y:2
} // {x:number; y:number;}
const v2={
  x:1 as const,
  y:2,
} // {x:1,y:number}
const v3={
  x:1,
  y:2,
} as const; // 타입은 {readonly x:1; readonly y:3}
as const를통해 타입스크립트는 최대한 좁은 타입으로 추론한다.
```

## 아이템 22 타입좁히기

> 넓은 타입으로부터 좁은 타입으로 진행되는 과정

타입을 좁히는 방법

1. 분기문(조건문)을 사용해라

```ts
const el = document.getElementById("foo"); //HTMLElement | null
if (el) {
  el.innerHTML = "Party dsfdsfsd";
} else {
  alert("sdfdsf");
}
function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return !!search.exec(text);
  }
  return text.includes(search);
}
```

2. 분기문을 사용해도 문제가 발생하는 경우

```ts
const el = document.getElementById("foo");
if (typeof el === "object") {
  el; // HTMLElement | null null도 object타입이다
}

function foo(x?: number | string | null) {
  if (!x) {
    x; // string | number | null | undefined
  }
}
```

3. 태그드 유니온을 사용하기

```ts
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: "download";
  filename: string;
}
type AppEvent = UploadEvent | DownloadEvent;
function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "download":
      e;
      break;
    case "upload":
      e;
      break;
  }
}
```

4. 타입가드로 배열과 객체의 타입을 좁히기

```ts
const jackson5 = ["Jackie", "Tito", "Jermaine", "Marlon", "Micheal"];
const members = ["Janet", "Michael"].map((who) => jackson5.find((n) => n === who)).filter((who) => who !== undefined);
// undefiend필터

타입가드를 사용하기
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
const jackson5 = ["Jackie", "Tito", "Jermaine", "Marlon", "Micheal"];
const members = ["Janet", "Michael"].map((who) => jackson5.find((n) => n === who)).filter(isDefined);

```

## 아이템 23 한꺼번에 객체 생성하기

```ts
const pt = { x: 3, y: 4 };
const id = { name: "Pythagoras" };
const namedPoint = { ...pt, ...id };
Object.assign(namedPoint, pt, id);

declare let hasDates: boolean;
const nameTitle = { name: "Khufu", title: "Pharaoh" };
const pharaoh = {
  ...nameTitle,
  ...(hasDates ? { start: -2589, end: -2566 } : {}),
}; //nameTitle + 스프레드 한 데이터 타입추론됨
```

## 아이템 24 일관성있는 별칭 사용하기

- 별칭 예시

```ts
const borough = { name: "Brooklyn", location: [40.688, -73.979] };
const loc = borough.location; // 별칭
```

> 별칭을 남발해서 사용하면 제어 흐름 분석이 매우 어렵다

- 일관성있는 별칭 사용

```ts
interface Coordinate {
  x: number;
  y: number;
}
interface BoundingBox {
  x: [number, number];
  y: [number, number];
}
interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[];
  bbox?: BoundingBox;
}

function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const { bbox } = polygon; // 별칭
  if (bbox) {
    const { x, y } = bbox;
    if (pt.x < x[0] || pt.x > x[1] || pt.y < y[0] || pt.y > y[1]) {
      return false;
    }
  }
}
```

- 별칭 단점

1. 해당 별칭에대한 함수를 호출했을때 별칭을 제거할가능성이있다 (타입스크립트는 함수가 타입 정제를 무효화하지 않는다고 가정한다.)
2. 타입스크립트가 타입을 좁히는것을 방해하여 변수에 별칭을 사용할떈 일관되게 사용하는것을 추천

- 비구조화 문법 사용
- 속성보다 지역변수를 사용해라

## item 25 : 비동기 코드에는 콜백대신 async 함수 사용하기

- 콜백보다는 프로미스를 사용하는게 코드작성과 타입추론면에서 좋음
- 프로미스를 생성하기보다 async await사용 하는것이 좋다
- 어떤함수가 프로미스를 반환하면 async로 선언해라

## item 26: 타입 추론에 문맥이 어떻게 사용되는지 이해하기

- 문자열 사용시 주의해야할점

```ts
type Language = "JavaScript" | "TypeScript" | "Python";
function setLanguage(Language: Language) {}
let language = "JavaScript";
setLanguage(language); // 할당시점에 값을 추론 const로선언하면 에러발생x
```

- 튜플 사용시 주의해야할점

```ts
function panTo(where: [number, number]) {}
// panTo([10, 20]); //정상
const loc = [10, 20];
panTo(loc); //에러발생 number[]로추론

// 아래와 같이 수정하면 에러 발생 사라짐
const loc: [number, number] = [10, 20];

function panTo(where: readonly [number, number]) {}
// panTo([10, 20]); //정상
const loc = [10, 20] as const; //상수단언으로 해결

panTo(loc);
```

- 객체 사용시 주의할점

```ts
type Language = "JavaScript" | "TypeScript" | "Python";

interface GovernedLanguage {
  language: Language;
  organization: string;
}
function complain(language: GovernedLanguage) {}
complain({ language: "TypeScript", organization: "Microsoft" }); //정상

const ts = { //변수를 뽑아서 별도로 사용
  language: "TypeScript",
  organization: "Microsoft",
};
complain(ts); // 에러발생 =>language타입은 string으로 추론 , as const로해결가능
```

- 타입추론은 문맥에서도 어떻게 쓰이는지 살펴봐야한다.
- 변수를 뽑아서 별도로 선언했을경우 오류가 발생하면 타입을 선언 or as const사용
