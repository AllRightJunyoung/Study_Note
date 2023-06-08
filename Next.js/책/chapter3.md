# Next.js 기초와 내장 컴포넌트

## 라우팅 시스템

- Next.js에서는 파일시스템 기반 페이지를 사용
- pages 디렉토리안에 파일명 기반으로 url이 라우팅된다
  - 단 jsx를 반환하는 함수를 익스포트해야 브라우저에 전송됨

예시

- index.js
- contact-us.js
- posts/

  - index.js
  - [slug].js

- posts/ => posts => index.js

동적라우팅

- [slug]는 경로 매개변수 => 사용자가 입력하는 모든값을 가질수있음
  - 위 폴더 구조는 아래와 같음
    - localhost:3000/posts/[slug] (동적라우팅명)

코드예시
pages/

- posts/
  - greet/
    - [name.js]

```jsx
export async function getServerSideProps=({params}){
    const {name}=params;
    return {
        props:{
            name,
        }
    }
}
function Greet(props){
    return (
        <h1> Hello , {props.name}! </h1>
    )
}

// https://localhost:3000/greet/Mitch?learning_nextjs=true
// {learing_nextjs : 'true' , name : 'Mitch'}

```

## 클라이언트에서 네비게이션 처리

> Next는 기본적으로 현재 화면에 표시되는 페이지의 모든 Link에 대해 연결된 부분 또는 페이지를 미리 읽어옴 (preload={false})로 비활성화가가능

```tsx
import Link from 'next/link';

function Navbar(){
    return (
        <div>
        <Link href='/'>>Home</Link>
        <Link href='/about'>>About</Link>
        <Link href='/about'>>Contacts</Link>
        </div>
    )
}

```

- 라우터 메소드

```jsx
import {useRouter} from 'next/router'

const router=useRouter()

router.push() 로 url 전환가능

```

## 정적 자원 제공

- 정적자원 : 이미지 폰트 아이콘 , 컴파일한 CSS or JS파일과 같이 동적으로 변하지 않는 모든 종류 파일

- 정적자원을 관리하고 제공하는것은 SEO 점수에 큰 영향을 미친다 (이미지파일)
  - 최적화된 이미지를 제공하여 사용자 경험에 좋은경향을 주자!
    => 또한 이미지 레이아웃이 변경되는 문제로 누적레이아웃 이동(CLS)가 발생한다.

# Next.js 이미지 최적화

> 기존의 HTML 의 img 태그에 복잡한 srcset 속성값을 지정하여 화면 크기별로 이미지를 조정해야하는 단점이 존재

- next.config.js 파일에 아래와 같은 속성을 적용

```js
module.exports = {
  images: {
    domains: [".com"],
  },
};
```

- Image 컴포넌트 안에서 핻아 도메인의 이미지를 불러올떄마다 Next.js가 자동으로 이미지 최적화

이미지 최적화속성

1. fixed : HTML의 img 태그와 동일
2. responsive : fixed와 반대로 동작 화면 크기를 조절함에 따라 이미지를 최적화해서 제공
3. intrinsic : fixed와 responsive를 절반씩 수용 (크기가 작을경우는 조절 큰화면에선 조절 x)
4. fill : 부모요소의 가로와 세로크기에 따라 이미지를 늘림
   > Next.js에서는 Image 컴포넌트를 통해 최적화가 가능하고 HTML img태그의 srcset 속성을 사용 , 또한 이미지 요청이 있을때만 자동 이미지를 최적화한다

# 3.3 메타데이터

- next.js는 내장 head 컴포넌트를 제공하여 동적으로도 메타 데이터를 쉽게 다룰수있음

```jsx
function IndexPage() {
  return (
    <>
      <Head>
        <title> Welcome to my Next.js website </title>
      </Head>
      <div>
        <Link href="/about">About us</Link>
      </div>
    </>
  );
}
```

## \_app.js 페이지

- pages/\_app.js
- 모든 페이지에서 공용됨
- getServerSideProps or getStaticProps를 사용불가
- 테마 , 장바구니 , 전역스타일추가 , 페이지 레이아웃 관리에 사용

## \_document.js 페이지

- html태그와 body 태그를 수정가능
- getServerSideProps나 getStaticProps 사용불가

```tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```
1. Html : Next.js의 html 태그 
2. Head : 모든페이지에서 사용될 컴포넌트
3. Main : Next.js가 페이지 컴포넌트를 렌더링하는곳 
4. NextScript : 커스텀 자바스크립트가 위치