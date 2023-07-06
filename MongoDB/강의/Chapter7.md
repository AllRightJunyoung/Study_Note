# 중첩구조 사용

- ref로 참조하지 말고 자식 스키마를 부모스키마에 그냥 대입시켜라 (조회 성능증가)

## updateMany

```js
// 해당 userID의 userName이 전부 변경된다.
Blog.updateMany({ "user.id": userId }, { "user.name": name });
```

## arrayFilter

```js

await Blog.updateMan((
    {},
    {"comments.$[element].userFullName": `${name.first} ${name.last}`},
    {arrayFilters:{"element.user._id":userId}}
))
// comments의 userFullName을 array로 필터하여 user._id가 userId인것을 전부 변경함



await Blog.updateMany({},
{"comments.$[comment].userFullName":`${name.first} ${name.last}`}
{arrayFilters:[{"comment.user":userId}]}
)
// userFullName을 userId기반으로 변경시킨다.

```

## delete 연산

```js

commentRouter.delete("/:commentId",async(req,res)=>{
    const {commentId}=req.params;
    const comment=await Comment.findOneAndDelete({_id:commentId})
    await Blog.updateOne({"comments.id":commentId},{$pull : {comments:{$elemMatch:{content:"hello", state:true}}}}
    //elemMatch는 해당조건이 만족할경우에 사용 위에는 comments의 content가 hello인경우

    await Blog.updateOne({"comments.id":commentId},{$pull : {comments: {$elemMatch:{content:"hello", state:true}}}}

    await Blog.updateOne({"comments.id":commentId},{$pull : {comments: {_id:commentId}}})

})

```

## 스키마 설계

1. 개별적으로 읽을떄도 있다 => 관계
2. 내장하려는 문서가 자주 바뀐다 ? => 관계
3. 같이 불러올떄가 많다 ? => 내장
4. 읽기 비중이 CUD보다 더 높다 ? => 내장

- N<100 => 내장
- 100 < N < 1000 => 부분 ID만 내장
- 1000< N => 관계 , N을 다양한 조건으로 탐색시 => 관계
