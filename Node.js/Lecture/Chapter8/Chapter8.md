# MongoDB 와 Mongoose
- NOSQL 데이터 베이스
- 컬렉션이라는것에 문서를 저장
- 문서 === 레코드 ,컬렉션 === 테이블


## NOSQL vs SQL

### NOSQL
- MongoDB,CouchDB
- 스키마 필요없음 ,언제든지 변경가능
- relations 관계가 적다
- 독립적인 문서로만 관리한다.
- 기록,주문,채팅메시지에 어울림


### SQL
- MySQL, MS SQL
- 엄격한 스키마 규칙사용 
- relation 관계가 중요
- 장바구니 ,연락처, 거대한 소셜네트워크

## REACT와 데이터베이스의 연결?
- 프론트엔드 코드는 브라우저에서 실행되므로 누구나 액세스가능하여 보안코드가 노출되는 단점이 존재한다

## Mongoose
- MongoDB와의 데이터베이스 상호작용을 위한 더 좋은 솔루션이다. 

## Mongoose 사용
1. models의 스키마 정의
2. 해당 스키마를 가져와서 get,post 메소드를 만든다 (mongoose.js참고)

## Mongoose Object id
- 일종의 객체 
- MongoDB 특유의 데이터타입