# JSX란?

- JSX는 Javascript 를 확장한 문법이며 Javascript의 모든 기능을 담고있다.
- JSX는 React 엘리먼트를 생성한다.
- JSX는 표현식이며 컴파일이 끝나면 Javscript 함수가 호출되고 Javascript객체로 인식된다.

> React는 예전의 별도의 파일에 마크업 로직을 넣어 분리하는 대신에 , 컴포넌트 라는 유닛으로 관심사를 분리한다.

# JSX 표현하기

~~~ jsx

const name ='홍길동';
const element=<h1>hello,{name}</h1>


// 표현식
function getGreeting(user){
  if(user){
    return <h1>Hello , {formatName(user)}!</h1>
  }
  return <h1>hello,Starnger.</h1>
}

// JSX속성 정의
const element=<img src={user.avatar.url}></img>

~~~

## JSX는 주입공격을 방지 함

- ReactDom은 JSX에 삽입된 값을 렌더링하기전에 이스케이프하여 문자열로 변환된다. XSS 공격을 방지할수있따

## JSX를 createElement로 표현
- JSX는 createElement로 추상화됨 아래와 같음
~~~jsx

const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
~~~
