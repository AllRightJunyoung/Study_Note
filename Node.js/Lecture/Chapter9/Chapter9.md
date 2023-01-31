# 백엔드를 데이터베이스에 연결하기
- 장소 모델 및 사용자 모델을 생성한다


~~~ js
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

## Mongoose findById 메소드
- 정적메소드이며 , 프로미스를 반환하지않아서 .exec()를 사용함

## 에러 바운더리

~~~ js

  try {
    await createdPlace.save()
  } catch (err) {
    const error=new HttpError(
      'Creating place failed, please try again.',500
    )
    // 비동기 처리시에 사용 코드 실행 중단시 꼭 넣어줘야한다 .안그러면 코드가 계속 실행된다
    return next(error)

~~~

## 관계 맺기
- 장소와 사용자 간에 관계 맺기
- 사용자를 생성하면 place 배열이 추가가된다
- place 스키마에는 만든 User가 저장되어있다.

~~~ js
// place.js
// creator를 User스키마로 연동
creator:{type:mongoose.Types.ObjectId,required:true,ref:'User'}

// user.js
// places는 Place스키마와 연동
places:[{type:mongoose.Types.ObjectId,required:true,ref:'Place'}]



~~~
