# 캐시와 조건부 요청 헤더

Cache-Control 매우중요

1. Cache-Control : max-age

- 캐시 유효시간 , 초 단위

2. Cache-Control :no-cache

- 데이터는 캐시해도 되지만 , 항상 origin 서버에 검증하고 사용
  - origin 서버 : (중간서버가아닌 원래서버)
- 캐시는 저장하지만 , 사용할때마다 오리진 서버에 재검증 요청을 보내야만한다.

3. Cache-Control: no-store

- 데이터에 민감한 정보가 있으므로 저장하면안된다는뜻

2.Progma , Expire 사용잘안함

# 프록시 캐시

> 원래 서버에 있는 데이터를 접근하면 매우 오래걸림 => 프록시 캐시 서버를 도입하자!

- 미국에 있는 원서버에 접근하지 않고 한국에있는 프록시 캐시서버에 접근 (cdn 서비스)

## Cache-Control

1. public : 응답이 public캐시에 저장 되어도됨
2. private : 응답이 해당 사용자만을 위한것
3. s-maxage: 프록시 캐시에만 적용
4. Age: 60 : 오리진서버에서 응답후 프록시 캐시내에 머문시간
