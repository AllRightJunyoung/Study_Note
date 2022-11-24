# interface 의 타입 확장

~~~ts
interface Student{
  id:number;
  name:string
}

interface Student2 extends Student{
  age:number;
}
// Student2 = id name ,age
~~~

# type의 타입 확장 (& 사용)

~~~ts
type Student={
  id:number;
  name:string;
}
type Student2=Student & {
  age:number;
}
~~~

## Type과 Interface의 차이
- Interface는 선언 병합이 가능하지만 Type은 되지 않는다
> 선언 병합 : 동일한 이름을 여러번 선언해도 컴파일 시점에 합친다. =>확장성이 좋다
~~~ ts
interface Puppy {
    name: string;
}

interface Puppy {
    breed: string;
}

interface Puppy {
    culryHair: boolean;
}

// 동일한 이름을 여러번 선언
const molly: Puppy = {
    name: "Molly",
    breed: "poodle",
    culryHair: true,
};




~~~