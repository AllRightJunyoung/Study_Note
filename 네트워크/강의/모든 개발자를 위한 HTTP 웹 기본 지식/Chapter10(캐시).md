# 캐시 무효화

> 캐시를 적용안해도 웹브라우저가 임의로 게시 해버릴수있음

## 확실하게 캐시를 무효화하기 위한 방법

> 사용자의 통장잔고 같이 계속 갱신이 되는 정보는 캐시를 무효화시켜야한다

- Cache-Control: no-cache,no-store,must-revalidate
- Pragma : no-cahe (HTTP 1.0 하위호)

1. Cache-Control : no-cache

- 데이터는 캐시해도 되지만 항상 원 서버에 검증후 사용

2. Cache-Control : no-store

- 데이터에 민감한 정보가있으므로 저장 x (메모리에서 사용하고 최대한 빨리삭제)

3. Cache-Control : must-revalidate

- 캐시 만료후 최초 조회시 원서버에 검증
- 원서버 접근 실패시 504 에러 발생

4. Progma: no-cahe

- HTTP 1.0하위 호환

## no-cache 기본 동작 과정

1. 웹브라우저에서 no-cache +ETAG를 달고 캐시서버에 요청한다
2. 프록시 캐시 서버는 1번에서 받은 데이터를 받고 no-cache임을 확인한뒤 원서버에 검증요청한다
3. 원서버는 프록시캐시서버에 응답을 하고 프록시캐시서버는 웹브라우저에 응답한다

> no-cahe는 원서버에 접근할수없는 경우 프록시캐시 서버에서 설정하면 캐시데이터를 반환할수있음 , but must-validate로 설정됬을시에 504로 응답한다.
