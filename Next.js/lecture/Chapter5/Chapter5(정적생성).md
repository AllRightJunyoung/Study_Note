## 이번 챕터 목표
- Next.js에서의 프리렌더링
- Next.js가 서버사이드와 클라이언트 사이드 코드를 어떻게 융합시키는지
- Static과 서버사이드 페이지 차이


## 리액트에서의 렌더링 단점(CSR)
- 검색엔진에서는 콘텐츠가 전혀없는 데이터를 보게되므로 , 검색 엔진 노출에 문제발생 (시맨틱태그나 메타태그로 극복은가능)
  - 브라우저가 빈 HTML을 받고서 클라이언트에서 자바스크립트 파일을 실행해서야 보여짐 
> Next js에서 사전렌더링을 통해 해결했다.

## Next.js에서 렌더링 
1. React와 다르게 페이지와 필요할 법한 모든데이터가 있는 HTML콘텐츠를 사전에 렌더링한다. (pre-rendering)
   - (주요 콘텐츠 모두 포함, 자바스크립트 코드와도 연결) => 최초로딩
2. 1번이후 React code를 hydrate하여 사용자와 상호작용할수있는 웹을 만들어줌 (SPA) => Hydration이라고함
   - React를 통해 클라이언트 사이드 생성

## Next js에서의 pre-Rendering 방법 
1. 정적 생성
- 빌드 되는 동안 모든페이지가 사전에 생성 (배포전)
2. 서버사이드 렌더링
- 배포 후 요청이 올때 모든페이지가 생성된다.

## Next.js 정적 생성 방법
1. 빌드하는 동안 페이지를 사전 생성
  - 모든 데이터를 사전에 준비시킨다.
2. 배포한뒤 구축된 페이지는 서버나 앱을 실행시키는 CDN을 통해서 캐시로 저장된다


## Next.js pre-Rendering 지정하는방법
페이지 컴포넌트 내부에 존재해야한다. (pages/component)
비동기함수인 getStaticProps을 사용
  - 서버사이드에서만 실행되는 모든 코드 또한 실행가능 (클라이언트뿐만아니라)
  - 클라이언트에게 재전송되는 코드로 포함되지않음 (클라이언트 측에서는 볼수없다)


## getStaticProps 함수
- 원하는 코드를 제한 없이 실행이 가능하다
- 빌드 타임시 실행
- 서버사이드에서 제공되는 코드이다 (클라이언트에서는 못읽음)
1. 컴포넌트에 대한 props를 준비한다
2. 컴포넌트 함수를 실행한다
예시코드 
~~~ tsx
function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
}
export default HomePage;

~~~

# 자주 변경되는 데이터는 Next.js에서는 어떻게 처리할까?
- 빌드를 계속해야하는거는 문제가 발생한다. 아래는 해결책

1. useEffect 훅으로 처리 (컴포넌트상에서)

2. Next.js에서 내장된 Incremental Static Generation 사용 
- 페이지 빌드시 정적으로 한번만 생성되는게 아닌 배포후에도 계속 업데이트가됨
   - 페이지 pre-rendering도하고 최대 x초를 정해 Next.js에서 새로운 페이지를 제공할수있음 (revalidate속성)

## ISA 예시
> getStaticProps함수에서 revalidate을 사용한다.
~~~ tsx
import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    revalidate:10
  };
}
export default HomePage;

~~~

## getStaticProps 구성옵션
- notFound : 404를 뛰울수있음
- revalidate : x초마다 새로운 페이지제공 (데이터변경시)
- redirect: 다른페이지 , 다른 라우트로 리다이렉션한다

~~~ tsx

import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  if(!data){
    return {
        redirect:{
            destination:'/no-data'
        }
    }
  }

  if(data.products.length===0){
    return {notFound:true}

}
  return {
    props: {
      products: data.products,
    },
  };
}
export default HomePage;

~~~

## getStaticPath
- 동적페이지에서 getStaticProps 함수를 사용할경우 필요하다 
  - why? : Multiple page이기 때문에 (얼마나 많은페이지를 Next.js에서 필요 한지 모른다)
    - 사전에 Next.js에 알려줘야한다. 

- fallback key
  - true옵션 (사전렌더링할 페이지를 정해놓자)
    - 일부 페이지 만 사전 렌더링 가능하게 하여 사전 생성되어야할 페이지가 많을떄 도움이된다.
       - paths 안에 매개변수가 없으면 사전렌더링이 되지않는데 , 요청이 서버에 도달하는 시점에 페이지가 생성되는 장점 
          > 단 url로 접근시에는 404 에러발생 (예외처리 필요 Loading)

  - 'block' 
    - 컴포넌트에서 폴백 확인을 할 필요가 없음
    - 서버에서 완전히 생성될때까지 기다림 (사용자 대기 속도가 생김)



~~~ ts
// pre-fetching 또한 된다.
export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
};
~~~