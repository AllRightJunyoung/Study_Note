- moongse는 몽고 DB 모듈을 가지고 있고 편의성이 좋음
- status 500 (server Error) ,status 400 (request Error)

# 몽고디비 명령어

- 스키마에서 unique 설정 : 중복된 value를 생성못하게함
- 스키마.find({}) 모든 데이터를 가져옴
- 스키마.findOne({조건}) 해당 조건에 맞는 데이터를 가져옴
- 스키마.findOneAndDelete({조건}) , or deleteOne : 삭제
- 스키마.findByIdAndUpdate(userId,{age},{new:true}})

# Monggose 내부가 어떤 작업을 하는가

- 내부적으로 타입을 알아서 변환해줌
- 터미널에서는 set 명령어를 써야했지만 알아서 처리해줌

# findOneAndUpdate vs save

```js
1. save인경우

let { username, name } = req.body;
if (!username) return res.status(400).send({ err: "error" });

// 유효성 체크
if (!name || !name.first || !name.last) return res.status(400).send({ err: "error" });

// mongoose로 유저 객체를 만듬
const user = new User(req.body);
await user.save();

2. findByIdAndUpdate

const user=await User.findByAndUpdate(userId,updateBody,{new:true})
userId를 검색하고 updateBody를 반영한다.


1,2 비교했을떄 2번방식이 서버 요청이 줄어든다.

```
