# 관계된 데이터 관리하기

- default 속성 :false => 기본값 지정

```js
유저 스키마 정의

const UserSchema=new Schema({
    username: {type:String,required:true,unique:true},
    name:{
        first:{type:String,required:true},
        last: {type:String,required::true}
    },
    age:Number,
    email:String
})
const User=model('user',UserSchema)
module.exports={User}


const BlogSchema=new Schema({
    title:{type:String,required:true}
    content:{type:String,required:true}
    islive:{type:Boolean,required:true,deafult:false}
    user:{type:Types.ObjectId,required:true,ref:'user'}
    // ref는 모델 참조 User스키마의 model명과 동일해야한다.

})
const Blog=modal('blog',BlogShema)
module.exports={Blog}

```

## Router에서 쿼리파라미터 값 전부다 불러오기

- Router({mergeParams:true}) 속성을 넣어준다
  - localhost:3000/blog/123/comment/456
    - /:commentId
      - blog뒤에있는 쿼리파라미터를 다가져옴

## Post 소스코드 예제

```js
commentRouter.post("/",async(req,res)=>{
    try{
        const {blogId}=req.params;
        const {content,userId}=req.body
        if(!isValidObjectId(blogId))
            return res.status(400).send({err:'blog is invalid'})
        if(!isValidObjectId(userId))
            return res.status(400).send({err:'userId is invalid'})

        if(typeof content!=='string') return res.status(400).send({err:"content is required"})

        const blog=await Blog.findByIdAndUpdate(blogId)
        const user=await User.findByIdAndUpdate(userId)

        if(!blog || !user) return res.status(400).send({err:"blog or user doest not exist"})
        const comment=new Comment({content,user,blog})
        await comminet.save()
    catch(err){
        return res.status(400).send({err:err.message})
    }

    }
})

```

## 위 코드를 promise all을 사용하여 api 요청 시간 개선하기

```js
commentRouter.post("/",async(req,res)=>{
    try{
        const {blogId}=req.params;
        const {content,userId}=req.body
        if(!isValidObjectId(blogId))
            return res.status(400).send({err:'blog is invalid'})
        if(!isValidObjectId(userId))
            return res.status(400).send({err:'userId is invalid'})

        if(typeof content!=='string') return res.status(400).send({err:"content is required"})

        const [blog,user]= await Promise.all([
            Blog.findByIdAndUpdate(blogId)
            User.findByIdAndUpdate(userId)
        ])
        // 병렬로 처리 하기

        if(!blog || !user) return res.status(400).send({err:"blog or user doest not exist"})
        const comment=new Comment({content,user,blog})
        await comminet.save()

    catch(err){
        return res.status(400).send({err:err.message})
    }
    }
})

```
