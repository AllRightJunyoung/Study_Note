# 타입 시스템

## 아이템 6

- 타입을 지정하지 않아도 변수와 함수의 타입을 추론할수있다,
  - vscode 상에서
- Vscode Go to Definction을 통해 정확한 타입을 볼수있다.
- 타입 선언파일을 봐서 타입스크립트에 타입을 잘 지정해라

## 아이템 7

- 타입을 값들의 집합으로 봐라
- 엄격한 상속관계가아니라 겹치지는 집합으로 생각해라 (벤다이어그램))

```ts
type A = "A";
type AB = "A" | "B"; //유니온 두개이상의 타입이 들어올떄 사용

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

# 아이템 8 타입공간과 값 공간의 심벌 구분하기

- 타입관점에서 typeof는 값을 읽어서 타입스크립트 타입을 반환
- 값의 관점에서 typeof는 자바스크립트 런타임의 typeof 연산자

# 아이템 9 : 타입 단언보다는 타입 선언 사용하기

```ts
interface Person {
  name: string;
}
const alice: Person = { name: "Alice" }; //타입선언
const bob = { name: "Bob" } as Person; //타입 단언
```

- 타입 선언은 할당되는 값이 해당 인터페이스를 만족하는지 검사
- 타입단언은 개발자가 타입을 강제로 지정 (타입체커는 에러감지 불가)

## 타입 단언이 필요한 예시

- 타입스크립트는 DOM에 접근할수 없기떄문에 엘리먼트를 알지못해서 DOM타입에대해서는 타입단언문을 사용한다.

# 아이템 10 : 객체 래퍼 타입 피하기

- 타입스크립트는 기본형과 객체 패러타입을 별도로 모델링한다
  - string (String) , number (Number) , boolean (Boolean), symbol (Symbol) , bigint(BigInt)

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
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present", // 객체 리터럴에 알수없는 속성 허용 x
};

//잉여속성체크 안함
const obj2 = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
};

const r: Room = obj2; //obj2 타입은 RooM에 맞지않으나 부분집합을 포함하므로 타입체커도 통과한다
```

# 아이템 12 : 함수 표현식에 타입스크립트 적용하기

- 타입스크립트에서는 함수 표현식을 사용하는게 좋다
  1. 함수의 매개변수부터 반환값까지 전체를 함수타입으로 선언하면 함수 표현식에 재사용할수있는 장점을 가짐
  2. 함수 표현식을 사용하면 parameter에 대해 타입추론을할수있게도와준다.
  - 매개변수나 반환값에 타입을 명시하기보다는 함수 표현식 전체에 타입구문을 적용해라
    - typeof fn을 통해 다른함수의 시그니처를 참조할수있음 (fetch함수)

```ts
// 함수 표현식을 재사용
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;

// 타입추론 예시
const checkedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error("Request failed " + response.status);
  }
  return response;
};
```

# 아이템 13 : 타입과 인터페이스의 차이점 알기

- 대부분의 경우에는 타입과 인터페이스를 사용해도된다 (공통)

  1. 인덱스 시그니처도 둘다 사용가능
  2. 함수타입도 둘다가능
  3. 제네릭도 둘다가능
  4. 둘다 타입 확장가능 하지만 인터페이스는 복잡한 타입을 확장하기 힘듬

- 차이점

```ts
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

- 인터페이스만 사용하던가 , 타입만사용하던가

# 아이템 14 : 타입 연산과 제네릭 사용으로 반복 줄이기

```ts
1. 타입에 중복을 붙여 반복을 줄이자
function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
interface Point2D {
  x: number;
  y: number;
}
function distance(a: Point2D, b: Point2D);

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

type TopNavState = {
  [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
};
// => pick으로 대체가능
type TopNavState =Pick<State,'userId' | 'pageTitle' | 'recentFiles'>
type TopNavKeys=keyof State

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


```

## item 16 number 인덱스 시그니처보다는 Array, 튜플,ArrayLike 사용

- 자바스크립트에서는 배열 인덱스들이 문자열로 변환되어 사용이되어 문자열로 접근이 가능하다
  - 타입스크립트는 이러한 혼란을 바로잡기 위해 숫자 키와 문자열 키를 다른것으로 인식
- for-in 루프는 key를 string으로 받고 성능이 느려 배열 순회시 사용 비추
- 인덱스 시그니처에 number를 사용하기보단 Array나 튜플 ArrayLike를 사용해라

## item 17 변경 관련된 오류 방지를 위해 readonly를 사용해라

> 매개변수로 참조형데이터를 받게되면 내부에서 변경될 우려가존재

- 매개변수를 readonly로 선언할시 다음과 같은일 발생
  - 타입스크립트가 매개변수가 함수내에서 변경되는지 체크
  - 함수를 호출하는쪽에서는 함수가 매개변수를 변경하지 않는다는 보장을 받음
  - 호출하는 쪽도 readonly 배열을 매개변수로 넣을수있음

1. readonly의 단점

- 중첩객체에서는 readonly가 제대로 동작않어 깊은 readonly타입을 사용해야한다 (ts-essentials에 있는 DeepReadonly)

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
