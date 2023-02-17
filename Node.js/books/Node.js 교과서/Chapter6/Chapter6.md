# 6.1 익스프레스 프로젝트 시작하기
1. npm i express 로 설치
2. npm i -D nodemon (nodemon 모듈로 서버를 자동으로 재시작)
   package.json의 scripts:{start:"nodemon app"}으로 지정
3. 익스프레스 내부에 http 모듈이 내장되어 있어 서버의 역할이 가능해진다.

app.js 구조
~~~ js
const express=require('express')
const app=express()

// 서버가 실행될 포트를 설정
app.set('port',process.env.PORT || 3000)

// get 요청이 들어올경우 서버에서 res로 클라이언트에게 전송
// req에는 클라이언트 정보 존재
app.get('/',(req,res)=>{
    res.send('Hello Express')
}

// 포트를 연결하고 서버를 실행하는 부분
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번에서 포트 대기중')
})
~~~

# 6.2 자주 사용하는 미들웨어
1. 미들웨어는 익스프레스의 핵심이다 (요청과 응답의 중간에 위치해있다.)
2. 미들웨어는 요청과 응답을 조작하여 기능을 추가하고 , 나쁜요청을 걸러낸다.
3. 미들웨어는 위에서부터 아래 순서대로 실행이된다
4. next를 통해 다음 미들웨어로 넘어간다

~~~ js
app.set('port',process.env.PORT || 3000)

app.use((req,res,next)=>{
    console.log('모든 요청에 다 실행됩니다.')
    next()
})
app.get('/',(req,res,next)=>{
    console.log('GET 요청')
    next()
},(req,res)=>{
    throw new Error('에러는 에러 처리 미들웨어로')
})
// 에러처리 미들웨어이다 매개변수는 err,req,res,next로 네개가 들어감
app.use((err,req,res,next)=>{
    console.error(err)
    res.status(500).send(err.message)
})
~~~

# 6.2 morgan 미들웨어
- 요청과 응답에 대한 정보를 콘솔에 기록한다.

~~~ js
app.use(morgan('dev')) // 인자로 dev | combined | common | short | tiny 가들어간다 . dev는 개발환경 , 배포는 combined환경
~~~

# 6.2.2 static 미들웨어
- 정적인 파일들을 제공하는 라우터 역할
~~~ js
app.use('요청경로',express.static('실제경로'))
app.use('/',express.static(path.join(__dirname,'public')))
~~~

# 6.2.3 body-parser
- 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
  - 보통 폼데이터나 AJAX 요청의 데이터를 처리한다. , 멀티파트 (이미지,동영상,파일)은 multer를 사용
- body-parser는 express 4.16.0 버전부터 내장되어있어 따로 설치가 필요가없으나 JSON과
  url-encoded 형식의 데이터외에도 본문이 버퍼데이터인 Raw , Text형식의 데이터를 추가로 해석이가능하다
- POST, PUT 요청을 전달받을시 req.on('data') , req.on('end') 사용할 필요없이 패키지가 내부적으로 스트림을 처리해 req.body에 추가

~~~ js
const bodyParser=require('body-parser')
app.use(bodyParser.raw())
app.use(bodyParser.text())

~~~

# body-parser url-encoded
- 주소 형식으로 데이터를 보내는 방식 (폼 전송시에 주로 사용)
- url-encoded {exteded:false} 옵션은 querystring 모듈을 사용해 쿼리스트링을 해석한다는 것 , true일경우 qs모듈을 사용
- name=zerocho&book=node.js를 본문으로 보낼시 JSON데이터로 알아서 파싱

# 6.2.6 미들웨어의 특성 활용하기 (중요)
- 미들웨어는 req,res,next를 가지고 , app.use , app.get , app.post등으로 장착한다.
- 미들웨어 내부적으로 next를 호출하는것도 있으나 next를 호출하지 않으면 res.send , res.sendFile등의 메소드로 응답을 보낸다.

~~~ js
next('route') 다음 라우터로 이동
next('error') 에러 처리 미들웨어로 이동
~~~

# 6.2.7 multer 미들웨어 
- 이미지 , 동영상 , 여러가지 파일을 멀티 파트 형식으로 업로드할 떄 사용하는 미들웨어
  - enctype= multipart/form-data인 폼을 통해 업로드하는 데이터 형식 (form 태그)

~~~ js
const multer=require('multer')
const upload=multer({
    storage:multer.diskStorage({
        // 서버의 어디에 저장할지 
        destination(req,file,done){
            done(null,'uploads/')
        },
        // file객체에는 업로드한 파일에대한정보 , done은 함수
        filename(req,file,done){
            const ext=path.extname(file.originalname)
            // 첫번째 인수는 에러가있으면 에러넣고 없으면 null, 
            // 두번째는 실제 파일이름 경로 , 
           //
           done(null,path.basename(file.originalname,ext)+Date.now()+ext)
        },
    }),
    limits:{fileSize:5*1024*1024}
})

// single 미들웨어는 하나의 파일업로드에만 사용
app.post('upload',upload.single('image'),(req,res)=>{
    // req.file는 업로드 한 유저의 파일정보가 담김
    res.send('ok')
})

~~~