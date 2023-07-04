# 성능

## N+1 problem

- 서버에서는 클라이언트 요청을 빨리 응답해야함

## populate

- join과 유사한 개념 (posts collection에서 users collection을 참조하고 있을경우 데이터를 참조된 데이터를 가져올수있음)

```js
.populate([{path:"user"}]) // ref가 설정되어있어야함
// path===키

```

## 가상필드를 이용하여 poplulate 사용하기

- DB에 저장되지 않은 필드
- populate는 ref가있어야한다.

```js
현재 블로그스키마는 ref가 존재하지않음

1. 가상필드 지정
BlogSchema.virtual("comments", {
  ref: "comment",
  localField: "_id", //로컬 필드
  foreignField: "blog", // comment에 참조할필드
});
BlogSchema.set("toObject", { virtuals: true });
BlogSchema.set("toJSON", { virtuals: true });

1. popualte사용
let blogs=await Blog.find({}).limit(20).populate([{path:"user"},{path:"comments"}])


```
