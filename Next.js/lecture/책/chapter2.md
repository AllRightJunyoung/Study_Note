## 서버 사이드 렌더링 (SSR) by Next.js

- 보통은 HTML 페이지를 웹브라우저로 전송 하기전에 서버에서 전부 렌더링 하고 Javscript를 요청하여 동적으로 페이지 내용 렌더링

  - 서버에서 렌더링한 페이지에 스크립트 코드를 집어 넣어 웹페이지를 동적으로 처리 => 하이드레이션 (CSR+SSR)

- 오래된 브라우저를 사용해도 웹피이지 제공 가능 ( 클라이언트 환경에서 자바스크립트를 사용하지 못할떄)

- 클라이언트에서 서버가 렌더링한 HTML 을 받기에 검색엔진 웹 문서 수집기가 페이지를 렌더링할 필요가 없어짐

- Next.js는 기본적으로 빌드시점에 정적으로 페이지를 만듬

## SEO 단점

- 클라이언트가 요청할떄마다 페이지를 다시 렌더링할수있는 서버가 필요 (더 많은 자원 소모 및 더 많은 부하를 보임)
- 페이지에 대한 요청을 처리하는 시간이 길어짐 (페이지가 외부 API나 데이터 소스에 접근한다면)

## CSR

- 1. URL 접근 => 2. HTML 화면에 렌더링 3. CRA가 빌드과정 동안 주입한 스크립트 link태그의 CSS파일을 다운로드하며 전체 애플리케이션 렌더링
- CSR의 단점은 초기에 웹브라우저 화면이 텅텅비어있음 (기본 HTMl 마크업만 제공) => 검색엔진 유출 약해짐

## CSR 장점

1. 전체 자바스크립트 번들을 다운로드하여 다른페이지로 이동하면 서버에서 새로운 콘텐츠 다운 없이 페이지의 콘텐츠를 쉽게 바꿀수있음
   => 새로 고침 필요없이 다른페이지 이동 , 단점은 다운로드 받는데 오래걸림 (초기로딩 느려짐)

2. Lazy loading으로 최소한의 HTML 마크업만 렌더링할수있음

3. 아주 간단한 HTML페이지를 클라이언트에 전송하여 서버 부하가 적음

## React.useEffect

- DOM 조작이나 데이터 불러오기 같은 사이드 이펙트를 컴포넌트 내부에 그냥 구현하면 Next.js에서는 빌드과정에서 오류가 발생한다
  - Why ? Node.js에서 제공을 하지 않고 브라우저에서만 제공하는 함수이기때문에
  - 해결방법 : useEfect훅을 사용하여 컴포넌트가 마운트되고서 실행되도록 만들면된다 !

## 동적 컴포넌트 로딩

```jsx

import dynamic from 'next/dynamic';

const Hightlight=dynamic(()=>import ('/components/Highlight')),
{ssr:false}
);

function DynamicPage(){
    return(
        <div>
            <Highlight>/>
        </div>
    )
}
```

- 이렇게 동적임포트를 사용하면 Next.js는 해당 컴포넌트를 서버에서 렌더링하지않고 하이드레이션이 끝날때까지 기다려야 해당 컴포넌트를 사용

## SSR이 필요없는경우

- 관리자 페이지나 비공개 프로필 페이지 (검색 엔진 유출 x)

# SSG (정적 사이트 생성)

- 전체 페이지를 빌드시점에 미리 렌더링

  - 웹 어플리케이션을 빌드 할떄 내용이 거의 변화지 않은 페이지를 제공하면 좋다
    - 리액트 하이드레이션 덕분에 이런 정적페이지에서도 여전히 사용자와의 상호작용이 가능해짐

- 단순 HTML 파일로 CDN을 통해 파일을 제공하거나 캐시에 저장하기 쉽다

- 서버에 부하를 주지 않음 (정적 자원 형태로 제공) => 서버쪽에 데이터를 요구하지 않기에

- 외부 API를 호출하거나 데이터베이스에 접근하거나 보호해야 할 데이터에 접근할일이없음 (빌드시점에 미리페이지로 렌더링되어있음)

## SSG 단점

- 변경이 있는 블로그 페이지 일경우 데이터가 변경할때마다 정적페이지를 다시 생성해야함
  - Next js에서는 ISR(증분 정적 재생성)을통해 정적페이지를 다시 렌더링하고 내용을 업데이트할지 정할수있음

## SSG의 활용

-> ISR과 사용하여 데이터를 캐싱하여 제공할수있다

소스코드 예시

```jsx
export async function getStaticProps() {
  const userReq = await fetch("/api/user");
  const userData = await userReq.json();

  const dashboardReq = await fetch("/api/dashboard");
  const dashboardData = await dashboardReq.json();

  return {
    props: {
      user: userData,
      data: dashboardData,
    },
    revalidate: 600,
  };
}
function IndexPage(props) {
  return (
    <div>
      <Dashboard user={props.user} data={props.data} />
    </div>
  );
}
```

- 빌드 과정에서 함수를 호출해서 필요한 데이터를 가져오고 다음번 빌드 타임까지 더이상 호출 x
- revalidate 옵션을 통해 정적페이지의 빌드시간을 제공함

Flow

1. Next.js는 빌드과정에서 페이지의 내용을 getStaticProps 함수가 반환하는 객체의 값으로 채우고 이페이지는 빌드를 거쳐 정적페이지로 만들어짐
2. 처음 10분간 해당 페이지를 요청하는 모든 사용자는 동일한 정적페이지를 제공
3. 10분이 지나고 해당페이지에 새로운 요청이 들어오면 Next.js는 이페이지를 서버에서 다시렌더링한뒤 getStaticProps함수를 다시 호출
4. 새로운 정적페이지를 만들고 이전에 만든 정적페이지를 새로 만든 정적페이지에 덮어씀

> But Next.js는 ISR을 최대한 지연시켜서 처리 , 따라서 10분이 지난후에도 페이지에대한 새로운 요청이 없을경우 Next.js는 진행을 하지않는다.
