## Express.js 
- Node.js를 위한 프레임워크 (Node 환경으로 서버를 쉽게 구축)
- 미들웨어 중심으로 구성되어있다


## Express.js 추가하기
~~~ js
const express=require('express')
const app=express()

app.use((req,res,next)=>{
    let body=''
    req.on('end',()=>{
        const userName=body.split('=')[1]
        if(userNmae){
        req.body={name:userName}
        }
        next() //다음 미들웨어로 넘어간다
    })
     req.on('data',(chunk)=>{
        body+=chunk
    })
})

// 서버에서 html 을보낼수있음
app.use((req,res,next)=>{
    if(req.body){
        return res.send('<h1'>+req.body.name+'</h1>')   
    }
    res.send('<form method="POST"><input type="text" name="username"><button type="submit">제출</button></form>')
})
app.listen(5000); // port번호 5000으로 서버구동



~~~