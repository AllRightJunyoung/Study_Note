## 백엔드를 데이터베이스에 연결하기
- 장소 모델 및 사용자 모델을 생성한다 (models 폴더) 
  - Place 스키마 및 User 스키마 정의 
- REST API의 CRUD메소드를 관리하는 controllers 폴더

- REST API의 routes를 관리하는 routes 폴더

~~~ js
데이터 베이스 연결하기
// 데이터베이스 네임
const url=`mongodb+srv://moon2421:a21524679@cluster0.1zxdjlp.mongodb.net/places?retryWrites=true&w=majority`
mongoose.connect(url)
.then(()=>{
  app.listen(5001);
}).catch(err=>{
  console.log(err)
})
// 컬렉션네임
mongoose.model('Place',placeSchema)
~~~

## 데이터베이스 같은 비동기처리에서 에러바운더리 처리
~~~ js
## 에러 바운더리

  try {
    await createdPlace.save()
  } catch (err) {
    const error=new HttpError(
      'Creating place failed, please try again.',500
    )
    // 비동기 처리시에 사용 코드 실행 중단시 꼭 넣어줘야한다 .안그러면 코드가 계속 실행된다
    return next(error)
~~~

# 현재 실습파일에서 사용하는 Mongoose 메소드 종류
## findById 메소드
- 정적메소드이며 , 프로미스를 반환하지않아서 .exec()를 사용함
- _id를 기준으로 단일 문서를 찾는다.

## populate 메소드
- 다른 컬렉션에 저장된 문서를 참조하고 그 컬렉션에 있는 다른 기존 문서의 데이터를 가지고 작업을 할수있다
  - 하나의 document가 다른 document의 ObjeectId를 쓰는경우
    - 관계가 설정된 부분에서만 사용이가능 (ref 참조)
      - ref로 지정된 테이블에서 정보를 얻어오고 ObjectId의 정보들을 가져온다.




## 관계 맺기 (ref)
- 장소와 사용자 간에 관계 맺기
- 사용자를 생성하면 place 배열이 추가가된다
- place 스키마에는 만든 User가 저장되어있다.
> models폴더의 place.js 와 user.js 참고하기

## 세션과 트랜젝션
[https://medium.com/nodejs-server/mongoose-%ED%8A%B8%EB%A0%8C%EC%A0%9D%EC%85%98-714870976af5]

- 트랜젝션 : 여러 작업들을 고립된 상태로 진행시켜준다
  - 쉽게 말하면 여러작업들이 전부다 성공했을경우에만 성공하고 , 하나라도 실패하면 모두가 실패된다 (이전 상태로 되돌아감 (RollBack))

- 세션 : 트랙젝션위에 만들어진다.

## 코드예시 1

~~~ js
// 1. 세션 생성
const session = await db.startSession();

// 2. 트렌젝션 시작
session.startTransaction();
// 3-1.kim의 계좌에서 인출
await Account.update({ name: 'kim' }, { $inc : { money: 100 } }, { new: true }).session(session);
// 3-2. choi의 계좌에 송금
await Account.update({ name: 'choi' }, { $inc: { money: -100 } }, { new: true }).session(session);
// 4. commit
await session.commitTransaction();
// 5. 세션 끝내기
session.endSession();
~~~

코드 예시 2
~~~ js 
  // 여러 연산중 하나가 실패하면 장소생성이 실패하거나 , 사용자 문서에 장소 ID를 저장하는게 실패해서
  // 다른연산과는 무관하게 개별적 연산 실패가 발생하면 나머지 연산도 모두 실패하게 만들어야한다 .
  // 트랜젝션과 세션을 사용해야한다 !
  // 트랜젝션을 사용하면 여러개의 연산을 개별적으로 수행하거나 연산을 취소 할수있다 
  // 트랜젝션은 세션이라고 불리는것 위에 만들어진다. 
  // 세션 다음에 트랜젝션을 시작한다 트랙젝션 완료후 세션은 종료후 커밋을 한다

  try {
    const sess=await mongoose.startSession()
    sess.startTransaction()
    await createdPlace.save({session:sess}) // 장소 저장 세션
    user.places.push(createdPlace) 
    // mongoose내부 메소드이며 , 우리가 참조하는 두개의 모델을 연결시켜주는 역할
    // 여기서 생성된 장소 ID(createdPlace)를 MongoDB가 가져가는데 Places에 오직 createPlaceId를 추가한다.

    await user.save({session:sess}) // 유저 저장 세션
    await sess.commitTransaction()
    //  이과정에서 문제가 발생될시 MongoDb가 모든 수정사항을 자동으로 롤백하게 된다
    
  } catch (err) {
    const error=new HttpError(
      'Creating place failed, please try again.',500
    )
    // 코드 실행 중단시 꼭 넣어줘야한다 .안그러면 계속 실행된다
    return next(error)
  }
  res.status(201).json({ place: createdPlace });
  // 트랜젝션의 경우에는 컬렉션이 존재하지 않는 상황에서는 컬렉션도 생성해야한다.
  // 

~~~