# 몽고 DB

- 몽고디비에 대한 수요가 점차 적으로 늘어나고있음
- 요즘 프론트는 CSR기반으로되어있어 , 필요한 데이터만 클라이언트에서 백앤드에 axios 요청하여 데이터 일부를 가져와서 깜빡꺼리는 문제가 사라짐

- 백앤드에서 데이터베이스를 호출해야 보안문제가 없어짐 (클라이언트 사이드에서는 서버로부터 데이터를 가져오는 형식으로 .. )

# 정리

- \_id:ObjectId => 몽고 DB에서 자동으로 생성해주는 유니크 키
- 몽고 DB는 JSON형태로 저장
- 몽고 DB는 Schemaless 여서 RDBMS에 비해 key value가 자유로움

## 명령어

- insertOne , updateOne

- db.users.updateOne({"name.first":"Elon"},{$set : {"name.last":"musk2"}})
- => name이 first인 Elon의 last를 musk2로 바꾼다.

- db.users.updateOne({\_id:ObjectID("")},{$set : {age:1}}) => ObjectId로도 업데이트가 가능

- db.users.deleteOne({\_id:ObjectID("")}) => delete

MongoDB 내부 구조

- 큰 (database)
- user (collection) database 하위
- user1(document) =>컬렉션 하위
