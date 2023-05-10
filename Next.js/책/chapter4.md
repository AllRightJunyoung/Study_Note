# 4.1 디렉토리 구조 구성

## 컴포넌트 구성 (아토믹 디자인패턴)

1. atoms

- 코드에서 사용되는 가장 기본적인 컴포넌트들 (button,input,p)

2. molecules

- atom에 속한 컴포넌트 여러개를 조합하여 좀 더 복잡한 구조를 만듬
  - input+label 컴포넌트를 합치던지

3. organisms

- molecules와 atoms를 섞어서 만듬
  - 회원가입 양식이나 푸터 캐러셀

4. templates

- 페이지 스켈레톤 (atoms,molecules,organism 들의 조합)

## 유틸리티 구성

- 컴포넌트외에서 사용하는 기능함수 (utils)
  - 현재시각 계산 , localStorage,jwt,logs 같은것들

## 정적 자원 구성

- public/assets 형식으로 만듬
- 이미지 , 컴파일한 자바스크립트 파일 , 컴파일한 CSS파일 , 아이콘 ,manifest.json,robot.txt

## 스타일 파일 구성

- styles 디렉토리 사용 or 컴포넌트별로 스타일 파일을 따로만들어서 코드를 구성

## lib 파일 구성

- 서드 파티 라이브러리를 감싸는 스크립트
- graph ql 이나 mutation

# 4.2 데이터 불러오기

- 정적페이지 (getStaticProps를사용해서 빌드시점에 데이터를 불러옴)
- 서버가 페이지를 렌더링시에는 getServerSideProps를 사용 (빌드후에 데이터를 불러옴)
- Next.js로는 전체 애플리케이션의 프론트엔드 영역만 담당하는것을 추천
  - 데이터 베이스에 직접 접근해서 가져올경우 안전하지 않아 Strapi,Contentful같은 외부시스템 백앤드 프레임워크로 처리하는것이 좋다
- Axios를 사용해서 REST API에대한 요청을 만듬

- 인증 방식은 주로 Oauth 2.0 , JWT API키를 많이사용

소스코드 예시

```jsx
import {useEffect} from 'react';
import Link from 'next/link';

export async function getServerSideProps(){
    const usersReq=await axios.get('https://api.rwnjs.com/04/users')
    return {
        props:{
            users:usersReq.data
        }
    }
}
function HomePage({users}){
    return (
        <ul>
        {users.map(user)=>(
            <li key={user.id}>
            <Link href={`/users/${user.username}`} passHref>
            {user.username}
            </Link>
            </li>
        )}
        </ul>
    )
}

```

## 서버에서 REST API 사용하기

- getServerSideProps 에서 axios로 호출후 컴포넌트의 props에 전달
- process.env 파일로 API키나 토큰 정의해서 가져옴

## 클라이언트에서 데이터 가져오기

주의사항

- 브라우저에서 원격 데이터베이스에 직접 연결하면안됨
- SSL 인증서를 통해 안전하게 접근할수있는곳의 HTTP API만 사용 (Main in the middle 공격에 노출)
- 믿을수 있는곳에만 HTTP 요청을 보냄

## 클라이언트에서 REST API 사용하기

- 컴포넌트가 마운트된뒤에 불러옴 (useEffect)

1. CORS 문제 발생
2. 클라이언트 인증 토큰 노출 문제
   - pages/api/파일명.js로 handler함수를 정의하여 서버로부터 데이터를 가져오는 로직을 작성해서 해결
     => 요것도 api 주소가 유출되는 문제가 있기에 백앤드 프레임워크를 사용하는것을 추천
