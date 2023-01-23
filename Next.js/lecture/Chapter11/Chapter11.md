## 블로그 웹사이트 구축

### slug 장점
- 검색엔진에 최적화되어있는 슬러그 식별자를 찾을수있게됨


## 마크 다운 파일 가져와서 리액트에서 사용하는방법
1. react-mark-down
- 마크다운 파일을 JSX로 변환하여 출력해준다.
2. gray-matter 라이브러리 => 파일을 읽어서 가져옴
- posts-util.js 참조하는거 추천
- post-content 컴포넌트 참조하기 
  - paragraph를 오버라이딩 하면 이미지 포함 전체단락 렌더링가능 

## 소스코드 md파일 렌더링하기
- 리액트 마크다운에서 code메소드를 오버라이딩 (post-content 컴포넌트 보기)
- react-syntax-highlighter를 사용하면 코드 강조도 가능

## getStaticPaths
- pre-rendering할 페이지의 동적경로를 지정하는 함수이다. 
  - 지정안하면 next.js는 동적경로로 요청이왔을때 알수없다

## MongoDB를 통한 데이터 저장
> 코드예시 :서버에서 post요청을 받고 이에대한 데이터를 저장 (api폴더 참고)
~~~ js
async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(
        'mongodb+srv://maximilian:2YkcXq43KyPk0vqp@cluster0.ntrwp.mongodb.net/my-site?retryWrites=true&w=majority'
      );
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
}
~~~

## _app.js 파일
- 페이지에 적용될 공통레이아웃 
- 서버로부터 요청이 올떄 가장 먼저 실행되는 컴포넌트
## _documents.js 파일
- _app.js 다음에 실행이되며 메타태그나 body태그 안에 들어갈 내용들을 커스텀할때사용
- HTMl 문서를 정의 내리므로 폰트 import , 웹접근성관련태그를 설정할수있다.
