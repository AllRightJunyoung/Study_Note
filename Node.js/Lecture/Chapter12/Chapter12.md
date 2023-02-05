## 이번세션 요약

# 인증과 권한 부여
1. 사용자를 로그인하게 하는 인증작업
2. 권한 부여작업도 수행 (로그인한 사용자라고 하더라도 모든것을 허용하지 않음)


# 과거 SSR에서의 Authentication (알아보기)
- 과거에는 템플릿 엔진의 도움으로 서버에서 HTML을 렌더링했음
  - 서버에서 세션을 생성하여 세션ID를 클라이언트로 보내 쿠키에 저장해서 Autentication 


# SPA에서 Authentication
1. 서버에서 토큰을 만들어서 클라이언트로 전달 (이때 토큰은 쿠키나 로컬스토리지에 저장한다.)
2. 클라이언트는 요청에 토큰을 첨부하여 인증된 사용자로 식별해달라는 요청을 보냄

- 토큰 : 특정 데이터 조각이 인코딩된 특정 알고리즘으로 생성된 문자열
> 서버는 프라이빗 키를 통해 토큰을 만들수있음


## jwt 토큰 생성

~~~ js

  let token;
  token=jwt.sign({
    userId:createdUser.id,
    email:createdUser.email
  },'supersecret_dont_share',{expiresIn :'1h'}) 


~~~