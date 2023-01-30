## Express.js 
- Node.js를 위한 프레임워크 (Node 환경으로 서버를 쉽게 구축)
- 미들웨어 중심으로 구성되어있다
  - 모든 요청을 여러개의 미들웨어 함수를 통해 수신하고 처리한다.



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
        next() // 다음에오는 미들웨어로 요청을 전달하고 싶을떄 호출한다.
        
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

# Express.js의 장점
## Nodemon
- Node.js에서 구동되며 프로젝트내의 파일을 변경하고 저장할떄마다 서버를 다시시작해준다.

## bodyParser
- req.body를 파싱할수 있는 (ready-to-use) 미들웨어를 제공한다
~~~ js
app.use((req,res,next)=>{
    let body=''
    req.on('end',()=>{
        const userName=body.split('=')[1]
        if(userNmae){
        req.body={name:userName}
        }
        next() // 다음에오는 미들웨어로 요청을 전달하고 싶을떄 호출한다.
        
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
위 코드를 아래처럼 변경이 가능해짐
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extened:false}))

app.post((req,res,next)=>{
    res.send('<h1'>+req.body.username+'</h1>')
})

app.use('/') // 도메인다음으로 시작되는 모든 /이후 url 요청에 대해 수신을받는다.
 
app.get('/',(req,res,next)=>{
      res.send('<form method="POST"><input type="text" name="username"><button type="submit">제출</button></form>')
})
~~~

## 코드가 실행되는 방식
- 미들웨어 함수는 즉시 실행이 되지않는다. 우리가 직접 호출이아닌 호출될떄만 실행된다.
  > 설정된 요건을 충족하는 요청이 수신될떄
