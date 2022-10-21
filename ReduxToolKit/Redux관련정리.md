# Redux 탄생 배경

- MVC 애플리케이션에 나타나는 데이터 간의 의존성 이슈를 해결하기위해 Flux 아키텍처의 구현체다

# Redux란?

- 자바스크립트를 위한 예측가능한 상태 저장소
- 어플리케이션의 복잡성을 줄여 우리의 코드가 예측가능하게 해준다.
- 하나의 상태를 가진다 (애플리케이션에 있는 모든 데이터를 저장소에 넣어서 가져다 씀)

## Redux 용어

1. store: 정보가 저장되는곳이다. (컴포넌트의 state를 저장하고있음)
2. reducer : state와 action을 매개변수로 받고 action에따라서 새로운 State를 만들어준다.
3. dispatch : reducer를 호출해준다 (reducer가 호출이 되면 액션 타입에 맞는 reducer를 실행해준다)
4. subscribe : store에 등록된 구독자들에게 알려준다.
5. getState : state값을 가져올수있다.

## Redux 사용자 Flow

1. 사용자가 버튼을 누르면 action이 발생한다 (리듀서에 등록된 action인경우)
2. dispatch가 발생하며 해당 dispatch는 reducer에 action과 state를 전달해준다.
3. reducer는 actiontype 에 대응하는것을 찾고 action type에 맞는것을 실행하여 새로운 State를 반환해준다
4. 그 이후 dispatch는 subscribe에 등록된 구독자 들에게 상태가 변경되었다고 알림을 날려준다

## Redux를 사용하는이유 ?

- Store에 저장된 state의 값이 변할떄 해당 state를 구독하는 컴포넌트만 리렌더링됨
- 어플리케이션을 단순화시킬수있음 (비슷한 로직들을 하나의 저장소에서 관리한다. => propdrilling 문제해결)
- Time Traveling기능을 제공한다 (과거의 상태로 돌아감 )

# Redux toolkit의 등장배경

1. 기존의 Redux는 설정이 까다로움 (코드가 굉장히 번잡해짐)
2. 비동기작업을할떄 미들웨어를 설치해야되는 번거로움
3. 불변성 유지를 위해 라이브러리를 사용해야하는 번거로움 등 여러 라이브러리들을 많이 사용해야됨
4. 기능별로 작은 스토어를 만들수있음

> 또한 기존의 리덕스를 사용하기 쉽게 만들어준다

- 코드예시

~~~jsx


// 작은 store 설정
const counterSlice=createSlice({
  name:'counter',
  initalState:{value:0},
  reducers:{
    up:(state,action)=>{
      state.value=state.value+action.payload;
    }
  }
})

// 스토어 설정
const store=configureStore({
  reducer:{
    counter:counterSlice.reducer
  }
})

// 컴포넌트
function Counter(){
  const dispatch=useDispatch()
  const counter=useSelector(state=>{
    console.log(state)
  })
  return <div>
  <button onClick={()=>{
    dispatch(counterSlice.actions.up(2));
  }}></button>
  <div>
}
// 스토어 구독
function App(){
  return (
    <Provider store={store}>
    <div>
      <Counter/>
    </div>
    </Provider>
  )
}
~~~





# 참고

- <http://blog.hwahae.co.kr/all/tech/tech-tech/6946/>
