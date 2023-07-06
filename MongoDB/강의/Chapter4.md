- moongse는 몽고 DB 모듈을 가지고 있고 편의성이 좋음
- status 500 (server Error) ,status 400 (request Error)

- mongoose.isValidObjectId
  - ObjectId인지 검증

# 몽고디비 명령어

- 스키마에서 unique 설정 : 중복된 value를 생성못하게함
  - Schema 생성 옵션
- 스키마.find({}) 모든 데이터를 가져옴 (배열리턴)
- 스키마.findOne({조건}) 해당 조건에 맞는 데이터를 가져옴 , 객체리턴
- 스키마.findOneAndDelete({조건}) 삭제된 객체리턴 , or deleteOne : 삭제, 삭제된객체 리턴x
- findByIdAndUpdate(userId, { $set: { age } }, { new: true });
  - new true시 업데이트 된 상태 반환
  -

# Monggose 내부가 어떤 작업을 하는가

- 내부적으로 타입을 알아서 변환해줌
- 터미널에서는 set 명령어를 써야했지만 알아서 처리해줌

# findOneAndUpdate vs findById방식

```js

1. findOneAndUpdate 방식

userRouter.put("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: "invalid userId" });
    const { age, name } = req.body;
    if (!age && !name) return res.status(400).send({ error: "age or name is required!" });
    if (age && typeof age !== "number") return res.status(400).send({ error: "age must be a number" });
    if (name && typeof name.first !== "string" && typeof name.last !== "string")
      return res.status(400).send({ error: "first and last string" });

    let updateBody = {};
    if (age) updateBody.age = age;
    if (name) updateBody.name = name;
    // let user = await User.findById(userId);
    // if (age) user.age = age;
    // if (name) user.name = name;
    await user.save();

    const user = await User.findByIdAndUpdate(userId, updateBody, { new: true });
    return res.send({ user });
  } catch (error) {}
});
userId를 검색하고 updateBody를 반영한다.
장점 :  DB호출이 적어짐
단점 : mongoose에서 스키마 타입 검증 불가 (직접 검증필요)

2. findById방식

userId를 검색하고 updateBody를 반영한다.
장점 :  mongoose에서 스키마 타입 검증 가능
단점 : DB호출이 많아짐



```
