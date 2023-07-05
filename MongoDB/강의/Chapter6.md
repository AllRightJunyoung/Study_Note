## 스키마 관계

- User와 Blog는 1:N , Blog와 Comment는 1:N , User와 Comment는 1:N

## 클라이언트사이드에서 API요청시 성능 이슈 코드

- 아래 코드는 클라이언트에서 서버로부터 데이터 여러개를 받는것이지만 현재 서버의 코드는 N+1의 문제를 가지고있음 ( 여러 ref 관계가있는것을 각각 호출하므로..)

```js
const test=async () =>{
    let { data:{blogs},}=await axios.get(`${url}/blog`)
    blogs=await Promise.all(
        blogs.map(async (blog)=>{
            const [res1,res2]=await Promise.all([
                axios.get(`${URI}/user${blog.user}`)
                axios.get(`${URI}/blog${blog._id}/comment`)
            ]);
            blog.user=res1.data.user;
            blog.comments=await Promise.all(
                res2.data.comments.map(async (comment)=>{
                    const {data : {user},}=await axios.get(`${URI}/user/${comment.user}`);
                    comment.user=user
                    return comment;
                })
            )
            return blog;
        })
    )
}


```

## N+1 problem

- 서버에서는 클라이언트 요청을 빨리 응답해야함
- populate 연산으로 호출을 한번에 하도록 하자.

## populate

- join과 유사한 개념 (posts collection에서 users collection을 참조하고 있을경우 데이터를 참조된 데이터를 가져올수있음)

```js
.populate([{path:"user"}]) // ref가 설정되어있어야함


blogRouter.get("/",async(req,res)=>{
    try{
        let blogs=await Blog.find({}).limit(20).populate([{path:"user"}])
        return res.send({blogs})
    } catch(err){
        console.log(err)
        res.status(500).send({err:err.message})
    }
})



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

```

```
