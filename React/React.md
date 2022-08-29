## 리액트 version 16 이전
- 클래스 컴포넌트를 사용 , 리덕스사용

## 리액트 version 16 부터
- 함수형 컴포넌트 사용 ,Context API 등장 (use Reduce와 결합하여 사용) React Hook 개념등장


# React 란?
- SPA 기반으로 등장 
- JSX기반 문법으로 사용 
- Virtual Dom으로 작동하는 라이브러리
- 컴포넌트 기반 구조로 컴포넌트를 조합해서 웹사이트를 개발할수있음 
  - 컴포넌트는 재사용성에서 좋음 
  - 모듈간에 의존성이 적어 유지보수가 쉬움

# React의 단점으로는?
  - 상태관리가 어려워짐 (Redux ,mobx ,Recoil,Context API)로 해결은했음
    - props Drill 발생
 - 


# JSX 란 ?
- A syntax extension to Javascript (자바스크립트의 확장문법)
- Javascript and XML 
  - 내부적으로 XML/HTML 코드를 자바스크립트로 변환해준다

# JSX 장점
- 코드가 간결해짐 
- 가독성이 좋아진다
- Injection Attack을 방어할수있음
  - 입력창에 문자나 숫자같은 일반적인 값이 아닌 소스코드를 입력함 (자바스크립트 코드 실행 ) XSS공격


# JSX 장점 코드예시
~~~jsx
<div>Hello, {name}</div>
React.createElement('div',null,`Hello,${name}`)
~~~


## React.createElement 란?
- 첫번쨰인자로 엘리먼트타입 , 두번쨰 엘리먼트 프로퍼티 (props), 세번쨰 자식노드들이들어감 
  - 첫번쨰 인자 = React 엘리먼트타입,HTML타입,React Fragment 타입이 올수있다.
- JSX문법 => babel을 통해 React.createElement로 전환 => Javscript 객체로 전환


~~~ jsx
// 1단계 JSX문법 
function Component(){
    return (
        <div className="hi">
        <h1>Hello</h1>
        </div>
    )
} 

// 2단계 아래와같이 변경
function Component(){
    return React.createElement('div',{
        className:"hi"
    },React.createElement("h1",null,"Hello"))
}

// 3단계 React.createElement 생성된 객체 아래와 같이 변경됨  => 불변성을 유지하면서 생성됨 
// 자바스크립트의 객체와 같이 
const element={
    type:'div',
    props:{
        className:'hi',
        children:[
            {
                type:h1,
                children:'Hello'
            }
        ]
    }

}
~~~


## ReactDom.render 란?
- 첫번쨰 인자 = element , 두번쨰인자 = container
- ReactElement를 container DOM에 렌더링을 하고 컴포넌트에 대한 참조를 반환
- 전달한 컨테이너 노드의 콘텐츠를 제어함
- 컨테이너의 하위노드들만 수정한다.
- 기존 자식을 덮어 쓰지 않고 기존 DOM노드에 구성요소를 insert함 
- 서버에서 렌더링한 컨테이너에 보충할시에는 ReactDom.hydrate를 사용함


## ReactDom.hydrate
- 첫번쨰 인자 =element , 두번쨰인자 =container
- 두번재 인자로 지정된 dom 요소에 하위로 hydrate 처리함
- 기존 DOM Tree에서 해당 되는 DOM 요소를 찾아 정해진 자바스크립트 속성만 적용함 
- next.js ?

 # 참고 

 - https://medium.com/react-native-seoul/react-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90-02-react-createelement%EC%99%80-react-component-%EA%B7%B8%EB%A6%AC%EA%B3%A0-reactdom-render%EC%9D%98-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC-41bf8c6d3764

 