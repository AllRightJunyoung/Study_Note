# 아이템 1 : 타입 스크립트란?

- 자바스크립트로 컴파일되며 실행시 자바스크립트로 이루어진다.
- 자바스크립트의 상위집합
- 자바스크립트의 프로그램은 타입스크립트로 돌릴수있다.
- 자바스크립트에 타입이 붙어진 언어다
- 자바스크립트의 런타임 동작을 모델링하는 타입시스템
- 자바스크립트 프로그램과 타입체커를 통과한 타입스크립트 프로그램이 존재한다.

## 타입 시스템의 목표

- 런타임에 오류를 발생 시킬 코드를 미리찾는것

## 타입 스크립트의 정확성

- 타입 구문 없이도 오류를 잡아 낼수있지만 , 타입 구문을 추가하면 훨신 더 많은 오류를 잡아낼수있다

  - 타입 구문없을 경우 오류를 정확히 잡아낼수없음 => 타입구문을 체크해라!

- 런타임시에 동작 되는 코드도 타입체커는 문제점을 표시한다
  - 타입체커에는 통과할수도있음

## 아이템 2 : 타입스크립트 설정 이해하기

1. tsc --init을 통해 생성한 설정파일을 추천한다
2. noImplictAny

- 설정이 안되어있으면 자바스크립트를 사용하는거나 다른없어짐

3. strcitNullChecks
   null과 undefined를 허용 안하게함

## 아이템 3 : 코드 생성과 타입이 관계없음을 이해하기

1. 최신 타입스크립트/자바스크립트를 브라우저에서 동작하려면 구버전의 자바스크립트로 트랜스파일 한다
2. 코드의 타입 오류를 체크
   > 1,2 둘다 독립적으로 진행된다.
- 이러한 이유로 타입 체크와 트랜스 파일은 독립적으로 동작하기 때문에 , 타입 오류가 있는 코드도 컴파일이 가능하다
  - 작성한 타입스크립트가 유효한 자바스크립트라면 컴파일이되지만, 타입체크의 문제는 발생할수있음
- 런타임에는 타입 체크가 불가능하다. (instanceof 같이 런타임시g 체크되는 부분에 있어 문제 발생)
  > 이러한 문제로 타입을 제대로 명시했어도 서버로 부터 오는 데이터타입이 다르면 문제될수있음
  - 자바스크립트로 컴파일되는 과정에서 모든 인터페이스 타입과 타입구문은 제거됨

## 런타임에 타입체크가 불가능한 값 미리 타입 체킹하는방법 (태그기법)

````ts
interface Square {
  kind: "square";
  width: number;
}
interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}
// 유니온 타입으로 미리 명시해놓는다.
type Shape = Square | Rectangle;

//
function calculateArea(shape: Shape);
``

## 타입스크립트 타입은 런타임 성능에 영향을 주지않음
- 타입과 타입연산자는 자바스크립트 변환시점에 제거 된다 (런타임 오버헤드는 x)

## 구조적 타이핑에 익숙해지기

```ts
interface Vector2D {
  x: number;
  y: number;
}
function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
interface NamedVector {
  name: string;
  x: number;
  y: number;
}

const v: NamedVector = { x: 3, y: 4, name: "Zee" };
calculateLength(v); //정상 ,결과는 5

// Vector2D와 NamedVector는 전혀 관계가 없지만 NamedVector의구조가 Vector2D와 호환 되기떄문에 호출이 가능해짐
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

// calculateLengths는 Vector2D에 맞춰져 있어서 이상한결과를 발생시킴
// 하지만 타입체커는 인식을 못한다.
function normalize(v: Vector3D) {
  const length = calculateLength(v);
  return {
    x:v.x;
    y:v.y;
    z:v.z;
  }
}
normalize(x:3,y:4,z:5)
````

# Item 5 : any 타입 지양하기

- 타입의 안정성이 사라진다
- 함수의 시그니처가 무시된다
- vscode 자동완성 속성이 사라진다.
- 런타임시 에러가 나올 가능성이 높음 (타입체커가 체킹을 제대로 못해서)
  > 타입체커가 감지를 제대로 못한다.
